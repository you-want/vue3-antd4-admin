# vue3-antd4-admin

这个模板是来源于关于 vue3 + antd4 + vite4 + pnpm （vue3-antd4-admin）

## 相关文档

[vue3 文档](https://staging-cn.vuejs.org/guide/introduction.html)

[vite 文档](https://cn.vitejs.dev/)

[pinia 文档](https://pinia.vuejs.org/)

[Vue Router 文档](https://router.vuejs.org/zh/index.html)

[pnpm 文档](https://pnpm.io/zh/)

[qiankun 文档](https://qiankun.umijs.org/zh/)

[vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)

[VueUse 文档](https://vueuse.org/)

[Unocss 文档](https://uno.antfu.me/)

## 建议的IDE设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (需要禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 在TS中键入对`.vue`导入的支持

TypeScript 默认情况下无法处理`.vue`导入的类型信息，因此我们将`tsc`CLI 替换为`vue-tsc`以进行类型检查。

在编辑器中，我们需要 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)，以使 typescript 语言服务知道`.vue`类型。

如果你觉得独立的 TypeScript 插件不够快，Volar 还实现了[Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) 更具性能。您可以通过以下步骤启用它：

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
