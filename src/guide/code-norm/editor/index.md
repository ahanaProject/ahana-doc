# 1. 编辑器规范

## 1. setting.json配置

可以设置vscode setting.json 或者 在项目根目录创建 .vscode/settings.json

```json
{
  // 文件嵌套显示
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "tsconfig.json": "tsconfig.*.json, env.d.ts",
    "vite.config.*": "jsconfig*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .prettier*, prettier*, .editorconfig, .stylelintrc*, .gitignore, .gitattributes, .npmrc, .gitmodules"
  },

  // 格式化配置
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnSaveMode": "file",

  // 保存时自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "explicit"
  },

  // ESLint 配置
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "vue", "html"],

  // Prettier 配置
  "prettier.requireConfig": true,
  "prettier.configPath": ".prettierrc",
  "prettier.useEditorConfig": false,
  "prettier.resolveGlobalModules": false,
  "prettier.ignorePath": ".prettierignore",

  // 文件处理
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,

  // 工作区特定设置
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false
}
```

## 1.2 .prettierrc配置

```json
{
  // 打印宽度
  "printWidth": 120,
  // 缩进宽度
  "tabWidth": 2,
  // 使用空格缩进
  "useTabs": false,
  // 语句末尾添加分号
  "semi": true,
  // 使用单引号
  "singleQuote": true,
  // JSX 中使用单引号
  "jsxSingleQuote": true,
  // 对象属性引号方式
  "quoteProps": "as-needed",
  // 多行时尽可能打印尾随逗号
  "trailingComma": "es5",
  // 对象大括号内添加空格
  "bracketSpacing": true,
  // 多行 HTML 元素的 > 放在最后一行的末尾
  "bracketSameLine": false,
  // 箭头函数参数添加括号的方式
  "arrowParens": "avoid",
  // 顶部添加 pragma 注释
  "requirePragma": false,
  // 自动插入 pragma 注释
  "insertPragma": false,
  // 散文换行
  "proseWrap": "preserve",
  // HTML 空白敏感度
  "htmlWhitespaceSensitivity": "ignore",
  // Vue 文件中的 script 和 style 标签是否缩进
  "vueIndentScriptAndStyle": false,
  // 行结束符
  "endOfLine": "auto",
  // 嵌入式语言格式化
  "embeddedLanguageFormatting": "auto",
  // 每个属性单独一行
  "singleAttributePerLine": true
}
```

## 1.3 vscode必装插件

---

找项目组长要

---

1. Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
2. ESLint
3. Git Graph
4. Prettier - Code formatter
5. px to rem & rpx & vw (cssrem)
6. Vue (Official)
