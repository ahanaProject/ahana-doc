import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Ahana Awesome Platform',
  description: '框架使用文档',
  themeConfig: {
    nav: [
      { text: '首页', link: '/src' },
      {
        text: '组件库',
        items: [
          { text: 'Vue2/Vue3', link: '/v2/' },
          { text: 'Electron', link: '/src/guide/electron' },
          { text: 'Uni', link: '/v1/' },
        ],
      },
      {
        text: '编码规范',
        items: [
          { text: '1.编辑器规范', link: '/src/guide/code-norm/editor' },
          { text: '2.命名规范', link: '/src/guide/code-norm/naming' },
          { text: '3.HTML代码规范', link: '/src/guide/code-norm/html' },
          { text: '4.CSS样式规范', link: '/src/guide/code-norm/css' },
          { text: '5.JavaScript代码规范', link: '/src/guide/code-norm/java-script' },
          { text: '6.TypeScript代码规范', link: '/src/guide/code-norm/type-script' },
          { text: '7.Vue代码规范', link: '/src/guide/code-norm/vue' },
          { text: '9.Git规范', link: '/src/guide/code-norm/git' },
        ],
      },
    ],

    sidebar: {
      '/src/guide/started/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/src/guide/started/introduction/' },
            { text: '快速开始', link: '/src/guide/started/quick-start/' },
          ],
        },
      ],
      '/src/guide/electron/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/src/guide/started/introduction/' },
            { text: '快速开始', link: '/src/guide/started/quick-start/' },
          ],
        },
      ],
    },
  },
});
