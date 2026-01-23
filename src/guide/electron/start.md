# 开始使用

## 目录结构说明

```bash
electron-app/
├── 📁 src/
│   ├── 📁 main/                        # 主进程代码
│   │   ├── index.ts                     # 主进程入口文件
│   │   └── common/                      # 公共资源
│   │   └── 📁 window/                  # 系统
│   │       ├── config.ts                # 系统配置
│   │       ├── manager.ts               # 系统管理配置
│   │       📁 common/                   # 公共资源
│   │       └── 📁 controllers/          # 控制层
│   │           ├── index.ts            # 控制层入口，集中导入所有控制层
│   │           📁 services/             # 业务逻辑层
│   │           📁 tools/                 # 所有工具方法
│   │           📁 pojo/                  # 接口对象集合
│   │           ├── 📁 dto/               # 传输数据，适配接口
│   │           ├── 📁 po/                # 映射数据库
│   │           └── 📁 vo/                # 表示值，保证正确性和不变性
│   │
│   ├── 📁 renderer/       # 渲染进程代码
│   │   ├── index.html      # 主页面
│   │   ├── main.js         # 渲染进程入口
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # 组件
│   │   └── views/          # 页面
│   │
│   └── 📁 preload/         # 预加载脚本
│       └── index.ts         # 预加载入口
│
├── 📁 resources/          # 应用资源
│   └── icons/            # 应用图标
│
├── 📁 scripts/           # 自定义脚本
│   ├── dev.js           # 开发脚本
│   ├── build.js         # 构建脚本
│   └── release.js       # 发布脚本
│
├── package.json          # 项目配置
├── .gitignore           # Git 忽略文件
├── .env.development     # 开发环境资源
├── .env.test            # 测试环境资源
├── .env.production      # 生产环境资源
├── README.md            # 项目说明
└── tsconfig.json        # TypeScript 配置
```

## 架构说明

```bash
Electron 应用典型架构：
┌─────────────────────────────────────┐
│         渲染进程 (Renderer)         │
│  ┌──────────┐     ┌──────────┐    │
│  │   UI组件  │  →  │   Store  │    │
│  └──────────┘     └──────────┘    │
└─────────────┬───────────────────────┘
              │ IPC
              ▼
┌─────────────────────────────────────┐
│        主进程 (Main Process)        │
│  ┌──────────┐     ┌──────────┐    │
│  │   Router │  →  │ Controller│    │
│  └──────────┘     └──────────┘    │
│                      ↓             │
│  ┌──────────┐     ┌──────────┐    │
│  │ Service  │  ←  │Repository│    │
│  └──────────┘     └──────────┘    │
└─────────────────────────────────────┘
```
