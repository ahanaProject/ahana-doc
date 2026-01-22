# 2. 命名规范

- 避免缩写：使用完整的单词，除非是公认的词汇（如 id、URL）。
- 保持一致性：在整个项目中统一命名风格。
- 语义化：命名应能清晰表达其用途和含义。

## 命名规范对比

| 命名规范   | 示例         | 特点                           |
| ---------- | ------------ | ------------------------------ |
| kebab-case | user-profile | 全小写，单词间用连字符连接     |
| PascalCase | UserProfile  | 每个单词首字母大写             |
| camelCase  | userProfile  | 首单词小写，后续单词首字母大写 |
| snake_case | user_profile | 全小写，单词间用下划线连接     |

## 2.1 基本规则

1. 使用驼峰命名法（camelCase）：变量和函数名。

- 示例：userName、getUserData

2. 使用帕斯卡命名法（PascalCase）：类名、构造函数、枚举等。

- 示例：UserProfile、HttpRequestHandler

3. 常量使用全大写字母+下划线（UPPER_CASE）：

- 示例：MAX_RETRIES、API_BASE_URL

## 2.2 变量命名

1. 使用名词表示变量，避免使用缩写。
2. 语义化：变量名应清晰描述它的用途或内容。

```js
// 不推荐
let a = 10;

// 推荐
let userAge = 10;
```

3. 布尔值变量应以 is、has、can 或 should 开头。

```js
let isLoggedIn = true;
let hasPermission = false;
```

## 2.3 函数命名

1. 使用动词+名词组合，明确函数的动作和目标。

```js
// 不推荐
function data() {}

// 推荐
function fetchData() {}
```

2. 常见的函数前缀：

- 数据操作：get、set、fetch、update、delete
- 布尔逻辑：is、has、can、should
- 事件处理：handle、on
- 工具方法：format、calculate、convert

## 2.4 类名

1. 使用帕斯卡命名法（PascalCase）

```js
class UserProfile {}
class HttpRequestHandler {}
```

## 2.5 枚举

1. 使用帕斯卡命名法定义枚举类型，枚举值使用全大写字母。

```ts
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}
```

## 2.6 CSS/SASS 命名规范

1. BEM 命名法（推荐）：Block-Element-Modifier。

- Block（块）：独立的功能块。
- Element（元素）：块的子组件，用 \_\_ 连接。
- Modifier（修饰符）：块或元素的变体，用 -- 连接。
- 避免使用全局样式，尽量局部化。

```css
/* Block */
.button {
}

/* Element */
.button__icon {
}

/* Modifier */
.button--large {
}
```

2. 命名建议

- 语义化命名：类名表示样式的功能或用途。

```css
/* 不推荐 */
.red {
}

/* 推荐 */
.error-message {
}
```

- 避免缩写：增加可读性。

```css
/* 不推荐 */
.btn {
}

/* 推荐 */
.button {
}
```

## 2.7 文件和目录命名规范

### 2.7.1 文件命名

1. 使用小写字母+中划线（kebab-case）。

```bash
user-profile.js
user-profile.vue
user-profile.module.scss
```

2. TypeScript 文件以 .ts 或 .tsx 结尾。

```bash
api-service.ts
user-profile.tsx
```

### 2.7.2 目录命名

1. 目录名使用小写字母+中划线（kebab-case）。

```bash
components/
services/
utils/
```

2. 按功能组织目录结构

```bash
src/
├── components/    # 可复用组件
├── views/         # 页面级组件
├── services/      # API 请求逻辑
├── utils/         # 工具函数
├── store/         # 状态管理
└── styles/        # 样式文件
```
