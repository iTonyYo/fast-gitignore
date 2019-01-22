import fastGitignore from './src/fastGitignore';

(async () => {
  // 未提供内容主题
  // const res = await fastGitignore('', '.');

  // 以字符串的形式仅提供一个内容主题
  // const res = await fastGitignore('macOS', '.');

  // 提供一个多个内容主题
  const res = await fastGitignore(
    [
      'macOS',
      'Windows',
      'Linux',
      'Node',
      'VisualStudioCode',
      'SublimeText',
      'CVS',
      'Diff',
      'Vim',
      'TortoiseGit',
    ],
    '.',
  );
  console.info(res);
})();
