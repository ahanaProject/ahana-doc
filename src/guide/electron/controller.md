# 控制器

## RestController

标记一个类为控制器

```ts
import { RestController } from '@ahana-awesome-platform/ahana-electron-sdk/controller';

@RestController('user')
class UserController {}
```

## RequestMapping

将特定请求映射到具体的方法

```ts
import { RestController, RequestMapping } from '@ahana-awesome-platform/ahana-electron-sdk/controller';

@RestController('user')
class UserController {
  @RequestMapping('add')
  async addUser(event: IpcMainInvokeEvent, params: AddUserRequest, type: string) {}
}
```

## 建议使用控制器时的文件结构

```bash
- controllers
  - index.ts
  - UserController.ts
```

- **index.ts**：

这是一个入口，需要将标记控制器的类 引入到此文件

```ts
import './UserController';
```

:::info
在“主线程窗口配置”字段controllerRoot，使用懒加载引入 index.ts，引入一定要保证路径正确

示例： controllerRoot: () => import('../common/controllers/index.js')
:::
