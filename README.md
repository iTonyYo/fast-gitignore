# `@oopsunome/fast-gitignore`

添加 / 更新 `.gitignore`。内嵌 [`@oopsunome/fast-gitignore`]() 维护但来自 [`github/gitignore`] 的模板。

## 目录

  - [安装](#安装)
  - [使用](#使用)
      - [`fastGitignore(ignores, to)`](#fastgitignoreignores-to)
  - [参与开发](#参与开发)
  - [贡献指南](#贡献指南)
  - [证书](#证书)
  - [待办](#待办)

## 安装

```shell
# 使用 NPM
$ npm i @oopsunome/fast-gitignore

# 使用 Yarn
$ yarn add @oopsunome/fast-gitignore

# 使用 PNPM
$ pnpm install @oopsunome/fast-gitignore
```

## 使用

#### `fastGitignore(ignores, to)`

- `ignores` {Array | String} 需被 Git 忽略的内容的主题
- `to` {String} `.gitignore` 文件存储位置
- 返回: {Object}
  - `out` {String} 生成后的 `.gitignore` 所在位置
  - `message` {String} 生成结果陈述

```javascript
import fastGitignore from '@oopsunome/fast-gitignore';

(async () => {
  const generated = fastGitignore(
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

  await generated;

  /**
   * inited:
   * 
   * {
   *   out: '/Users/username/git-project',
   *   message: '成功添加 `.gitignore` 文件'
   * }
   */
})();
```

## 参与开发

**准备开发环境**

详细参见 [SETUP.md][SETUP.md]。

**安装依赖**

[`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 使用 [`Yarn`](https://yarnpkg.com/zh-Hans/) 包管理器，执行 `yarn install` 安装依赖。

**运行**

```shell
yarn start
```

**生产构建**

```shell
yarn build
```

**测试**

```shell
yarn test
```

## 贡献指南

仔细查阅 [CONTRIBUTING.md][贡献指南] 以了解详情。

## 证书

[`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 获得了 MIT 许可，仔细查阅 [LICENSE.md][证书] 以了解详情。

## 待办

- [X] 开发的时候使用 `ES 6/7`，支持构建 `ES 5` 模式的模块；
- [ ] 功能测试；
- [ ] 捆绑 [Git 倒钩][Git倒钩]；
- [X] ESlint 检测；
- [X] 生成所有依赖的开源证书；
- [ ] 更新日志；
- [ ] 谁在使用 [`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore]?
- [ ] 编写 [发布流程指南][发布流程指南]；
- [ ] 编写 [Git 指南][Git指南]；
- [ ] 编写 [命名指南][命名指南]；
- [ ] 编写 [版本指南][版本指南]；
- [ ] 完善 [贡献指南][贡献指南]；
- [ ] 文档：[编码风格指南][编码风格指南]；
- [ ] 使用 [David DM][DavidDM] 实现 `依赖是否最新` 检测；
- [ ] 使用 [Travis CI][TravisCI] 实现持续集成；
- [ ] 使用 [Coveralls][Coveralls] 可视化测试用例覆盖率；
- [ ] 使用 [Codacy][Codacy] 实现代码质量检测；
- [ ] 编写 [开发环境指南][SETUP.md]；
- [ ] 在什么场景下使用 [`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore]?
- [ ] 文档：在哪里可以获得更多帮助？
- [ ] 文档：设计思想；
- [ ] 文档：维护策略；
- [ ] 性能测试；

[编码风格指南]: #
[版本指南]: #
[命名指南]: #
[Git指南]: #
[发布流程指南]: #
[Git倒钩]: https://github.com/typicode/husky
[DavidDM]: https://david-dm.org/
[TravisCI]: https://travis-ci.org/
[Coveralls]: https://coveralls.io/
[Codacy]: https://www.codacy.com/
[贡献指南]: https://github.com/iTonyYo/fast-gitignore/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/fast-gitignore/blob/master/LICENSE.md
[Node]: https://nodejs.org/
[@oopsunome/fast-gitignore]: https://github.com/iTonyYo/fast-gitignore
[SETUP.md]: #
