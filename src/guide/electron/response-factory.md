# 响应报文

## 使用

:::info
appConfig 全局配置
:::

```ts
import type { ResponseError, ResponseFactoryApi } from '@ahana-awesome-platform/shared-types';
import ResponseFactory from '@ahana-awesome-platform/ahana-electron-sdk/response-factory';
import { appConfig } from '../../../../configs/app.config';

export class Factory {
  static responseFactory: ResponseFactoryApi;

  private static registerogger() {
    // logConfig 注册时如果传入配置项 则产生日志信息
    this.responseFactory = new ResponseFactory(appConfig.electronConfig.logConfig);
  }

  static successResponse<T>(data: T, message = '操作成功', code = 200) {
    if (!this.responseFactory) this.registerogger();
    return this.responseFactory.success(data, message, code);
  }

  static errorResponse(error: ResponseError, statusCode = 500) {
    if (!this.responseFactory) this.registerogger();
    return this.responseFactory.error(error, statusCode);
  }
}

// 在控制层使用
// 成功返回
Factory.successResponse();
// 错误返回
Factory.errorResponse();
```
