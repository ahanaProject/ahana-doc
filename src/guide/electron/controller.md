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

## 使用示例

### 1. 控制层

- 如果不需要数据库，则只用 1、2
- 接口名约定：RestController:RequestMapping 例如：user:add

:::info
UserService 是业务逻辑层这里处理具体业务逻辑
:::

```ts
// 1. 定义控制层
import type { IpcMainInvokeEvent } from 'electron';
import type { ResponseError } from '@ahana-awesome-platform/shared-types';
import { RestController, RequestMapping } from '@ahana-awesome-platform/ahana-electron-sdk/controller';
import UserService from '../services/UserService';

/**
 *  用户控制器
 */
@RestController('user')
class UserController {
  userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  // 创建用户
  @RequestMapping('add')
  async addUser(event: IpcMainInvokeEvent, params: AddUserRequest, type: string) {
    // 注册处理函数
    try {
      const result = await this.userService.addUser(params, type);
      return Factory.successResponse(result);
    } catch (error) {
      return Factory.errorResponse(error as ResponseError);
    }
  }
}

export default UserController;
```

### 3. 业务逻辑层

:::info
UserDtos 是传输数据定义的接口

UserDao 是映射数据库
:::

```ts
import type { AddUserRequest } from 'UserDto';

export default class UserService {
  // 创建用户
  async addUser(params: AddUserRequest, type: string) {
    try {
      return {};
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`添加用户失败: ${err.message}`);
      } else {
        throw new Error(`添加用户失败: ${String(err)}`);
      }
    }
  }
}
```
