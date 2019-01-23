import { promisify } from 'util';
import { readFile } from 'fs';
import path from 'path';

import callsites from 'callsites';
import join from 'lodash/join';
import fg from 'fast-glob';
import pMap from 'p-map';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

import saveFile from './saveFile';
import resolveRoot from './resolveRoot';

const generateGitignore = async (ignores, to) => {
  try {
    let glob;

    if (isArray(ignores)) {
      glob = `{${join(ignores, ',')}}`;
    }

    if (isArray(ignores) && isEqual(size(ignores), 1)) {
      const [topic] = ignores;
      glob = topic;
    }

    if (isString(ignores)) {
      glob = ignores;
    }

    if ((!isArray(ignores) && !isString(ignores)) || isEmpty(ignores)) {
      throw Error('必须提供内容主题');
    }

    const tplPaths = await fg(
      [
        path.join(
          path.join(
            callsites()[0].getFileName(),
            '/../..',
          ),
          `templates/${glob}.gitignore`,
        ),
      ],
    );

    const tplData = join(
      await pMap(tplPaths, async (filePath) => {
        const content = await promisify(readFile)(filePath, 'utf8');
        return content;
      }, { concurrency: 8 }),
      '\n\n\n',
    );

    await saveFile(
      tplData,
      resolveRoot('.gitignore', to),
    );
  } catch (error) {
    throw error;
  }
};

export default generateGitignore;
