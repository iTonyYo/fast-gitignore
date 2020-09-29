import { realpathSync } from 'fs';

import dirExists from './dirExists';
import generateGitignore from './generateGitignore';

/**
 * @param {Array} ignores - 需被 Git 忽略的内容的主题
 * @param {String} to - `.gitignore` 文件存储位置
 */
const fastGitignore = async (ignores, to) => {
  if (!(await dirExists(to))) {
    throw Error('保存位置必须有效');
  }

  await generateGitignore(ignores, to);

  return {
    message: '成功添加 `.gitignore` 文件',
    out: realpathSync(to),
  };
};

export default fastGitignore;
