# `@oopsunome/fast-gitignore`

添加 / 更新 `.gitignore`。内嵌 [`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 维护但来自 [`github/gitignore`][github/gitignore] 的模板。

## 目录

- [`fastGitignore(ignores, to)`](#fastGitignoreignores-to)
- [命令行](#命令行)
- [相关](#相关)
- [参与开发](#参与开发)
- [贡献指南](#贡献指南)
- [证书](#证书)

## `fastGitignore(ignores, to)`

- `ignores` {Array | String} 需被 Git 忽略的内容的主题
- `to` {String} `.gitignore` 文件存储位置
- 返回: {Object}
  - `out` {String} 生成后的 `.gitignore` 所在位置
  - `message` {String} 生成结果简述

#### 安装

```shell
# 使用 NPM
$ npm i @oopsunome/fast-gitignore

# 使用 Yarn
$ yarn add @oopsunome/fast-gitignore
```

#### 使用

```javascript
import fastGitignore from '@oopsunome/fast-gitignore';

(async () => {
  console.log(await fastGitignore(
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
  ));

  /**
   * 输出:
   *
   * {
   *   out: '/Users/username/git-project',
   *   message: '成功添加 `.gitignore` 文件'
   * }
   */
})();
```

> `fastGitignore(ignores, to)` 接口不支持读取配置，仅命令行工具支持。

## 命令行

- [X] 支持通过配置文件自定义 [`github/gitignore`][github/gitignore] 模板，减少多项目下重复操作;
- [X] 所有模板在安装 [`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 时就已经下载到本地，生成 `.gitignore` 文件非常快;

#### 使用

```
$ 使用方式
  $ fast-gitignore [主题] [...] [选项] [...]

  选项
    --out, -o,                                       '.gitignore' 文件存储位置，默认：'process.cwd()'
    --version, -V,                                   查看版本号
    --help, -h                                       查看帮助

  示例
    $ fast-gitignore macOS Windows Linux Node -o .   在命令行中指定需要忽略的文件
    $ fast-gitignore -o .                            已在配置中指定需要忽略的文件
```

#### 安装

在全局系统环境下使用的话，需要先全局安装 [@oopsunome/fast-gitignore][@oopsunome/fast-gitignore]，

```shell
# 使用 NPM
$ npm i -g @oopsunome/fast-gitignore

# 使用 Yarn
$ yarn global add @oopsunome/fast-gitignore
```

#### 配置

默认情况下，[`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 会搜索以下文件中的 `gitignore` 属性：

- `package.json` 属性；
- `JSON` 或者 `YAML` 等无后缀的 `rc` 文件；
- 有后缀的 `rc` 文件，诸如：`.json`, `.yaml`, `.yml`, 或者 `.js`；
- `.config.js` **CommonJS** 模块；

例如：

- `package.json` 文件中的 `gitignore` 属性
- `JSON` 或者 `YAML` 格式的 `.gitignorerc` 文件
- `.gitignorerc.json` 文件
- `.gitignorerc.yaml`, `.gitignorerc.yml`, 或者 `.gitignorerc.js` 文件
- 导出一个 JS 对象的 `gitignore.config.js` 文件

[`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 从工作目录开始搜索配置，如果在根目录没有找到，会继续搜索子目录，直到找到有效的配置。

配置示例：
```
{
  "gitignore": [
    "macOS",
    "Windows",
    "Linux",
    "Node",
    "VisualStudioCode",
    "SublimeText",
    "CVS",
    "Diff",
    "Vim",
    "TortoiseGit"
  ]
}
```

**如果同时在配置文件、命令行中都指定了模板，[`@oopsunome/fast-gitignore`][@oopsunome/fast-gitignore] 会选择在命令行中的声明。**

> `fastGitignore(ignores, to)` 接口不支持读取配置，仅命令行工具支持。

## 相关
- [`@oopsunome/latest-gitignore`][@oopsunome/latest-gitignore] - 添加 / 更新 `.gitignore`。直接从 [`github/gitignore`](https://github.com/github/gitignore) 项目 `master` 分支获取数据，而非 [`gitignore.io`](https://www.gitignore.io/)。

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

[贡献指南]: https://github.com/iTonyYo/fast-gitignore/blob/master/CONTRIBUTING.md
[证书]: https://github.com/iTonyYo/fast-gitignore/blob/master/LICENSE.md
[SETUP.md]: #
[github/gitignore]: https://github.com/github/gitignore
[@oopsunome/fast-gitignore]: https://github.com/iTonyYo/fast-gitignore
[@oopsunome/latest-gitignore]: https://github.com/iTonyYo/latest-gitignore
