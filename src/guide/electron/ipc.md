# IPC通信

## 注册IPC通信

找到主线程窗口配置的preload引入文件，设置如下参数

```ts
import type { IpcRendererEvent } from 'electron';
import { contextBridge, ipcRenderer } from 'electron';
import { Ipc } from '@ahana-awesome-platform/ahana-electron-sdk/ipc';

contextBridge.exposeInMainWorld('ipcAPI', {
  invoke: Ipc.invoke.bind(Ipc),
  send: Ipc.send.bind(Ipc),
  on: Ipc.on.bind(Ipc),
  once: Ipc.once.bind(Ipc),
  off: Ipc.off.bind(Ipc),
  invokeOperation: Ipc.invokeOperation.bind(Ipc),
});
```

### invoke

```ts
/*
 * 调用主进程方法 (请求-响应模式)
 * @param channel 通信通道
 * @param args 参数
 * @returns Promise<T>
 *
 * 使用场景：需要从主进程获取数据的场景，如获取系统信息、读取文件等。
 */
async function getAppInfo() {
  try {
    const info = await ipc.invoke('get-app-info');
    console.log('应用信息:', info);
  } catch (error) {
    console.error('获取信息失败:', error);
  }
}

// 主进程处理 (main process)
ipcMain.handle('get-app-info', () => {
  return {
    version: '1.0.0',
    platform: process.platform,
  };
});
```

### send

```ts
/*
 * 发送消息到主进程 (无响应)
 * @param channel 通信通道
 * @param args 参数
 *
 * 使用场景：不需要主进程回复的操作，如窗口控制、通知主进程状态变化等。
 */
function minimizeWindow() {
  ipc.send('window-minimize');
}

// 主进程处理
ipcMain.on('window-minimize', () => {
  mainWindow.minimize();
});
```

### on

```ts
/*
 * 监听主进程消息
 * @param channel 通信通道
 * @param listener 监听函数
 * @returns 取消监听函数
 *
 * 使用场景：监听主进程主动发送的消息，如更新通知、状态变化等。
 */
const unsubscribe = ipc.on('update-available', (event, versionInfo) => {
  console.log('新版本可用:', versionInfo);
});

// 组件卸载时取消监听
onUnmounted(() => {
  unsubscribe();
});

// 主进程发送
mainWindow.webContents.send('update-available', { version: '1.0.1' });
```

### once

```ts
/*
 * 移除监听器
 * @param channel 通信通道
 * @param listener 监听函数
 *
 * 使用场景：手动取消事件监听。
 */
const handler = (event, data) => console.log(data);
ipc.on('data-update', handler);

// 稍后取消监听
ipc.off('data-update', handler);

// 配合 on 返回的清理函数使用
// 添加监听并获取清理函数
const removeListener = ipc.on('window-focus-change', (event, isFocused) => {
  console.log('窗口焦点变化:', isFocused);
});

// 在组件卸载或适当时候移除
removeListener(); // 内部实际调用的是 ipc.off
```

### invokeOperation

```ts
/*
 * 发送事件到主进程并等待回复 (带超时)
 * @param channel 通信通道
 * @param timeout 超时时间(ms)
 * @param args 参数
 * @returns Promise<T>
 *
 * 使用场景：需要控制响应时间的操作，避免长时间等待。
 */
async function loadData() {
  try {
    // 5秒超时
    const data = await ipc.invokeOperation('load-big-data', 5000);
    console.log('数据加载成功:', data);
  } catch (error) {
    if (error.message.includes('超时')) {
      console.warn('操作超时，请重试');
    } else {
      console.error('操作失败:', error);
    }
  }
}
```

## 使用示例

1. 在主线程先定义控制器，参考控制器定义
2. 使用

```ts
// 1. 渲染层调用主线程
// 1.1 渲染层
const addUser = async () => {
  try {
    const info = await window.ipcAPI?.invokeOperation<
      {
        userName: string;
        passWord: string;
      },
      {
        userName: string;
        passWord: string;
      }
    >(
      'user:add',
      {
        userName: '12',
        passWord: '123',
      },
      'sql'
    );
  } catch (err) {
    console.log(err, 'errerrerrerrerr addUser');
  }
};

// 1.2 主线程
@RestController('user')
class UserController {
  @RequestMapping('add')
  async addUser(event: IpcMainInvokeEvent, params: AddUserRequest, type: string) {}
}

// ————————————————————————————————————————————————————————————————————————

// 2. 主线程调用渲染层
// 2.1 渲染层
onMounted(() => {
  window.ipcAPI?.on('update-available', (event: Event, versionInfo: unknown) => {
    console.log('新版本可用:', versionInfo);
  });
});

// 2.2 主线层 mainWindow 为当前渲染层窗口实例
mainWindow.webContents.send('update-available', params);
```
