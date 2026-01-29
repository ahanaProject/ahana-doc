# 系统操作

## windows系统注册表操作

## 1. 获取注册表值

```ts
import { getRegistryValue, WINHKLM } from '@ahana-awesome-platform/ahana-electron-sdk/platform';

try {
  // appname 是应用名称
  const result = await getRegistryValue(WINHKLM.SOFTWARE, appname, 'dbName');
} catch (err) {}
```

## 2. 设置注册表值

```ts
import { setRegistryValue, WINHKLM } from '@ahana-awesome-platform/ahana-electron-sdk/platform';

try {
  // appname 是应用名称
  const result = await setRegistryValue({
    hive: WINHKLM.SOFTWARE,
    key: appName,
    valueName: 'dbName',
    value: '0.0.1',
    options: {},
  });
} catch (err) {}
```

## 3. 删除注册表值

```ts
import { deleteRegistryValue, WINHKLM } from '@ahana-awesome-platform/ahana-electron-sdk/platform';

try {
  // appname 是应用名称
  const result = await deleteRegistryValue(WINHKLM.SOFTWARE, appname, 'dbName');
} catch (err) {}
```
