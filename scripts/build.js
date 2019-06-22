import { resolve } from 'path';
import { realpathSync } from 'fs';
import pMap from 'p-map';
import fg from 'fast-glob';
import execa from 'execa';
import chalk from 'chalk';

const resolveRoot = relativePath => resolve(
  realpathSync(process.cwd()),
  relativePath,
);

(async () => {
  const src = fg(['src/**/*.js']);

  await pMap(
    await src,
    async (path) => {
      try {
        return await execa(
          'npx',
          [
            'babel',
            '-d',
            resolveRoot('esm'),
            resolveRoot(path),
          ]
        );
      } catch (err) {
        throw err;
      }
    },
    { concurrency: 8 },
  );

  await execa('chmod', ['+x', resolveRoot('esm/cli.js')]);

  console.log(`
    ${chalk.greenBright('构建成功!')}
  `);
})();
