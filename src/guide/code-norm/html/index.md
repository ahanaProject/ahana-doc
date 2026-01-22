# 3. HTML 代码规范

## 3.1 基础语法规范

1. 文档类型

```html
<!DOCTYPE html>
<!-- 使用HTML5标准 -->
```

2. 语言属性

```html
<html lang="zh-CN">
  <!-- 中文页面 -->
</html>
```

3. 字符编码

```html
<meta charset="UTF-8" />
<!-- 必须放在<head>最前面 -->
```

## 3.2 Meta标签规范

```html
<head>
  <!-- 基础SEO -->
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <meta
    name="description"
    content="页面描述（150字内）"
  />

  <!-- 禁止转码（移动端） -->
  <meta
    http-equiv="X-UA-Compatible"
    content="IE=edge,chrome=1"
  />
  <meta
    name="renderer"
    content="webkit"
  />
</head>
```

## 3.3 注释规范

```html
<!-- 模块注释（前后空行） -->
<section class="user-profile">
  <!-- 用户名 -->
  <div class="username">...</div>
</section>

<!-- 待优化标记 -->
<!-- TODO: 图片懒加载未实现 -->
```

## 3.4 性能与可访问性

1. CSS/JS引入

```html
<!-- CSS 放在头部 -->
<link
  rel="stylesheet"
  href="styles.css"
/>

<!-- JS 放在尾部（除非需提前执行） -->
<script
  src="app.js"
  defer
></script>
```

2. 图片优化

```html
<!-- loading="lazy" 懒加载 -->
<img
  src="image.webp"
  alt="商品示意图"
  width="300"
  height="200"
  loading="lazy"
/>
```

3. ARIA属性

```html
<button aria-label="关闭弹窗">×</button>
```

## 3.5 语义化标签

1. 必须使用的语义标签

| 场景       | 标签    | 示例               |
| ---------- | ------- | ------------------ |
| 头部       | header  | 页面标题、导航栏   |
| 导航       | nav     | 主导航、面包屑     |
| 主体内容   | main    | 仅出现一次         |
| 独立内容块 | article | 博客文章、新闻卡片 |
| 章节       | section | 带标题的内容分组   |
| 页脚       | footer  | 版权信息、联系方式 |
| 辅助内容   | aside   | 侧边栏、广告区     |

2. 禁用标签（除非特殊场景）

- 样式类：`<b>`, `<i>`, `<font>`, `<center>`
- 废弃标签：`<frame>`, `<big>`, `<strike>`
