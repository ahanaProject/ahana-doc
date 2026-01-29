# 日志

## 使用

:::info
appConfig 全局配置
:::

```ts
/**
 * logConfig:
 *        APPNAME: 应用名称
 *        isdev:   是否为开发环境
 *                 不是：C:\Users\Administrator\AppData\Local\应用名称\logs
 *                 是：项目根目录\logs
 */

// 1. 定义日志
import type { Logger, LoggerConfig } from '@ahana-awesome-platform/shared-types';
import { LoggerService } from '@ahana-awesome-platform/ahana-electron-sdk/logger';
import { appConfig } from '../../../../configs/app.config';

export class Log {
  static logger: Logger;

  private static registerogger(sqliteDatabaseConfig: LoggerConfig) {
    this.logger = new LoggerService(sqliteDatabaseConfig);
  }

  // 快捷方法
  static error(message: string): void {
    if (!this.logger) {
      this.registerogger(appConfig.electronConfig.logConfig as LoggerConfig);
    }
    this.logger && this.logger.error(message);
  }

  static warn(message: string): void {
    if (!this.logger) {
      this.registerogger(appConfig.electronConfig.logConfig as LoggerConfig);
    }
    this.logger && this.logger.warn(message);
  }

  static info(message: string): void {
    if (!this.logger) {
      this.registerogger(appConfig.electronConfig.logConfig as LoggerConfig);
    }
    this.logger && this.logger.info(message);
  }

  static http(message: string): void {
    if (!this.logger) {
      this.registerogger(appConfig.electronConfig.logConfig as LoggerConfig);
    }
    this.logger && this.logger.http(message);
  }

  static debug(message: string): void {
    if (!this.logger) {
      this.registerogger(appConfig.electronConfig.logConfig as LoggerConfig);
    }
    this.logger && this.logger.debug(message);
  }
}

// 2. 使用日志
Log.error();
Log.warn();
Log.info();
Log.http();
Log.debug();
```
