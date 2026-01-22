# 4. CSS 样式规范

## 4.1 通用规范

1. 样式类名应具有语义化，描述具体的功能或用途，而不是外观。

```css
/* 不推荐 */
.red {
  color: red;
}
.big {
  font-size: 24px;
}

/* 推荐 */
.error-message {
  color: red;
}
.heading-large {
  font-size: 24px;
}
```

## 4.2 命名规则

1. 采用 BEM 命名法：

- Block（块）：独立的功能模块。
- Element（元素）：块的子部分，用 \_\_ 连接。
- Modifier（修饰符）：块或元素的不同状态或表现，用 -- 连接。

```css
  .button { ... }            /* Block */
  .button__icon { ... }      /* Element */
  .button--disabled { ... }  /* Modifier */
```

2. 多单词连接：使用**中划线（kebab-case）**连接单词。

```css
  .user-profile { ... }
```

## 4.3 属性顺序

### 4.3.1 推荐按照以下顺序排列属性：

- 布局属性：display、position、top、left 等。
- 盒模型属性：margin、padding、width、height 等。
- 视觉属性：color、background、font、border 等。
- 其他属性：animation、cursor 等。

```css
.box {
  display: flex;
  position: relative;
  margin: 10px;
  padding: 20px;
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  cursor: pointer;
}
```

### 4.3.2 行规则

```css
.example {
  color: #333;
  background-color: #fff;
  padding: 10px;
}
```

### 4.3.3 空白规则

```css
.header {
  margin: 0;
}

.footer {
  padding: 20px;
}
```

## 4.4 选择器规范

### 4.4.1 使用类选择器

1. 尽量使用类选择器，避免使用 ID 选择器。

```css
  /* 不推荐 */
  #header { ... }

  /* 推荐 */
  .header { ... }
```

### 4.4.2 避免过度嵌套

1. 嵌套选择器不超过3 层。

```css
  /* 不推荐 */
  .container .list .item .title { ... }

  /* 推荐 */
  .list-item__title { ... }
```

### 4.4.3 避免通配符选择器

```css
/* 不推荐 */
* {
  margin: 0;
  padding: 0;
}
```

## 4.5 样式分类

1. 按以下顺序组织样式文件：

- a.基础样式：全局样式、重置样式。

  - reset.css
  - variables.css

- b.组件样式：独立的 UI 组件。

  - button.css
  - card.css

- c.页面样式：特定页面的样式。
  - home.css
  - profile.css

## 4.6 使用注释

1. 为模块添加注释，清晰标识功能。

```css
/* === Reset === */
html,
body {
  margin: 0;
  padding: 0;
}

/* === Buttons === */
.button {
  display: inline-block;
  padding: 10px 20px;
}
```

## 4.7 CSS 变量和预处理器

1. 使用 CSS 变量

```css
:root {
  --primary-color: #007bff;
  --font-size-base: 16px;
}

.button {
  color: var(--primary-color);
  font-size: var(--font-size-base);
}
```

2. 使用预处理器（如 SASS/LESS）

- 推荐使用 SASS/LESS 编写复杂样式。
- 变量使用 $ 开头，采用中划线命名法。

```css
$primary-color: #007bff;
$font-size-large: 18px;

.button {
  color: $primary-color;
  font-size: $font-size-large;
}
```

3. 嵌套不超过 3 层

```css
.card {
  &__header {
    color: #333;

    &--highlight {
      color: #ff0;
    }
  }
}
```

## 4.8 响应式设计

### 4.8.1 Breakpoints

1. 使用常见的断点：

```css
  /* 手机 */
  @media (max-width: 576px) { ... }

  /* 平板 */
  @media (max-width: 768px) { ... }

  /* 桌面 */
  @media (max-width: 992px) { ... }

  /* 大屏 */
  @media (max-width: 1200px) { ... }
```

### 4.8.2 使用流式布局

1. 使用百分比或 flexbox 创建弹性布局。

```css
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
```

## 4.9 性能优化

### 4.9.1 减少重复样式

1. 合并常用样式到全局类名。

```css
.text-center {
  text-align: center;
}

.margin-top {
  margin-top: 20px;
}
```

### 4.9.2 避免使用 !important

### 4.9.3 使用简写属性

```css
margin-top: 10px;
margin-right: 10px;
margin-bottom: 10px;
margin-left: 10px;

/* 推荐 */
margin: 10px;
```
