import execa from 'execa';
import { src, scripts } from './paths';

(async () => {
  const srcGlob = `${src}/**/*.js`;
  const scriptsGlob = `${scripts}/**/*.js`;

  await execa('npx', [
    'prettier',
    '-w',
    '--loglevel',
    'silent',
    srcGlob,
    scriptsGlob,
  ]);
})();
