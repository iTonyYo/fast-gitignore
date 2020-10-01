import { promisify } from 'util';
import { readFile } from 'fs';
import path from 'path';

import callsites from 'callsites';
import fg from 'fast-glob';
import pMap from 'p-map';

import saveFile from './saveFile';
import resolveRoot from './resolveRoot';
import isStr from './isStr';
import isEmpty from './isEmpty';

const generateGitignore = async (ignores, to) => {
  let glob;

  if (Array.isArray(ignores)) {
    glob = `{${ignores.join(',')}}`;
  }

  if (Array.isArray(ignores) && ignores.length === 1) {
    const [topic] = ignores;
    glob = topic;
  }

  if (isStr(ignores)) {
    glob = ignores;
  }

  if ((!Array.isArray(ignores) && !isStr(ignores)) || isEmpty(ignores)) {
    throw Error('必须提供内容主题');
  }

  const tplPaths = await fg([
    path.join(
      path.join(callsites()[0].getFileName(), '/../..'),
      `templates/${glob}.gitignore`,
    ),
  ]);

  const tplData = (
    await pMap(
      tplPaths,
      async (filePath) => {
        const content = await promisify(readFile)(filePath, 'utf8');
        return content;
      },
      { concurrency: 8 },
    )
  ).join('\n\n\n');

  await saveFile(tplData, resolveRoot('.gitignore', to));
};

export default generateGitignore;
