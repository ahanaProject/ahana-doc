# 开始使用

## 目录结构说明

```bash
electron-app/
├── 📁 src/
│   ├── 📁 main/                        # 主进程代码
│   │   ├── index.ts                     # 主进程入口文件
│   │   └── configs/                      # 公共资源
│   │   └── 📁 window/                  # 系统
│   │       ├── config.ts                # 系统配置
│   │       ├── manager.ts               # 系统管理配置
│   │       📁 common/                   # 主线程资源配置
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

## 环境变量 【 必要变量 】

- development：
  - VITE_APP_ENV=development
  - VITE_DISTDIR=dist/development
  - VITE_SERVER_URL=`http://localhost:9321`

VITE_SERVER_URL 是渲染线程的服务地址，根据开发环境进行更改

- production
  - VITE_APP_ENV=production
  - VITE_DISTDIR='dist/production'

## 主线程窗口配置

- src\apps\ahana-electron-app\src\main\window\config.ts

```bash
isDev:                  是否处于开发环境
devUrl：                渲染线程的服务地址
prodPath：              打包后的渲染线程 index.html 入口
openDevTools：          是否打开调试窗口
controllerRoot：        控制器入口

windowOptions：         主线程窗口配置
  width：               宽
  height:               高
  title：               窗口标题
  backgroundColor：     窗口颜色
  webPreferences：      网页功能的设置
    nodeIntegration:    是否启用Node集成，默认false。
    contextIsolation:   是否启用上下文隔离，默认true。
    sandbox:            是否启用沙箱模式，默认true。
    preload:            预加载脚本的路径，这里指向当前目录下的preload.ts文件。
```

windowOptions [配置参考](https://www.electronjs.org/docs/latest/api/browser-window#new-browserwindowoptions)

## 全局配置

- src\apps\ahana-electron-app\configs\app.config.ts

```bash
electronConfig          electronConfig配置
  sqliteConfig          SQLite数据库配置
    dbName              数据库文件名（不带扩展名）
    encryptionKey       数据库加密密钥
  logConfig             日志配置
    appName             应用名称，用于日志记录
    encryptionKey       日志加密密钥 16位（如果需要加密日志文件）
  isDev                 是否处于开发模式
  appName               应用名称
```
