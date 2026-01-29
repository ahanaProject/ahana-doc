# 数据库

## 使用示例

### 1. 业务逻辑层

:::info
UserDtos 是传输数据定义的接口

UserDao 是映射数据库
:::

```ts
import type { AddUserRequest, QueryUserRequest, QueryAllUserRequest } from 'UserDto';
import { Transaction } from '@ahana-awesome-platform/ahana-electron-sdk/orm';
import UserDao from '../pojo/po/UserPo';

export default class UserService {
  // 创建用户
  async addUser(params: AddUserRequest, type: string) {
    try {
      const { model, sequelize } = await UserDao;
      // 直接返回 executeInTransaction 的结果
      return await sequelize.executeInTransaction(async (transaction: Transaction) => {
        // 检查用户是否存在
        const existingUser = await model.findOne({
          where: {
            userName: params.userName,
            passWord: params.passWord,
          },
          transaction,
        });

        if (existingUser) {
          throw new Error(`用户 ${params.userName} 已存在`);
        }
        // 创建新用户
        const createdUser = await model.create(params, { transaction });
        // return createdUser.toJSON(); // 返回创建的用户对象
        return createdUser; // 返回创建的用户对象
      });
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

### 2. 映射数据库PO

:::info
appConfig 全局配置

UserDto 标识数据库映射值，保证正确性和不变性
:::

```ts
import type { AhanaSequelize } from '@ahana-awesome-platform/shared-types';
import { getSqliteDatabase, DataTypes, ModelStatic } from '@ahana-awesome-platform/ahana-electron-sdk/orm';
import { appConfig } from '../../../../../configs/app.config';
import UserDto from '../vo/UserVo';

// User模型定义
const defineUserModel = (sequelize: AhanaSequelize): ModelStatic<UserDto> => {
  UserDto.init(
    {
      id: {
        type: DataTypes.CHAR,
        primaryKey: true,
        unique: true,
        comment: '主键ID',
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '账号',
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '生日',
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '性别；1男 2女',
      },
      passWord: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '密码（兼容字段）',
      },
    },
    {
      sequelize,
      modelName: 'user',
      tableName: 'user',
      freezeTableName: true,
    }
  );

  return UserDto;
};

// 使用立即执行函数处理异步
export default (async () => {
  try {
    // 获取数据库连接
    const sequelize: AhanaSequelize = await getSqliteDatabase(appConfig.electronConfig);
    // 定义模型
    const User = defineUserModel(sequelize) as ModelStatic<UserDto>;
    // 检查数据库健康状态
    sequelize.checkHealth();

    // 同步模型到数据库
    await sequelize.safeAlterTable(User, {
      isDropColumns: false, // 生产环境禁止删除列
      ignoreColumns: [], // 忽略时间戳字段
    });
    return {
      model: User,
      sequelize,
    };
  } catch (error) {
    throw error;
  }
})();
```

### 3. 数据库映射值VO

```ts
import { Model } from '@ahana-awesome-platform/ahana-electron-sdk/orm';

// 用户属性接口
interface UserAttributes {
  id?: string;
  userName?: string;
  passWord?: string;
  gender?: number;
  birth?: string;
}

/**
 * @Descripttion:               用户信息
 *      @params id              主键id
 *      @params userName        用户名
 *      @params password        密码
 *      @params gender          性别
 *      @params birth           生日
 */
class User extends Model<UserAttributes> implements UserAttributes {
  declare id: string;
  declare userName: string;
  declare passWord: string;
  declare gender: number;
  declare birth: string;
}

export default User;
```
