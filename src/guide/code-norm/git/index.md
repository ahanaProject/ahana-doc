# 9. Git规范

## 9.1 分支策略

### 9.1.1 分支定义

| 分支名称   |              环境/用途说明               |
| ---------- | :--------------------------------------: |
| main       | 预发布/演示环境（保证无bug，随时可演示） |
| release/\* |      预发布分支（用于准备发布版本）      |
| test       |           测试环境（集成测试）           |
| develop    |          开发环境（主开发分支）          |
| feature/\* |       功能分支（从 develop 拉出）        |
| hotfix/\*  |       紧急修复分支（从 main 拉出）       |
| bugfix/\*  |     bug 修复分支（从 develop 拉出）      |

### 9.1.2 分支命名规范

| 分支类型     |                 命名规则与示例                  |                           说明 |
| ------------ | :---------------------------------------------: | -----------------------------: |
| 功能分支​    | feature/简短描述 或 feature/issue-编号-简短描述 | 1. 使用英文小写和连字符（-）。 |
| Bug修复分支  |  bugfix/简短描述或 bugfix/issue-编号-简短描述   | 1. 使用英文小写和连字符（-）。 |
| 紧急修复分支 |  hotfix/简短描述或 hotfix/issue-编号-简短描述   | 1. 使用英文小写和连字符（-）。 |
| 发布分支     |     release/版本号或 release/版本号-rc编号      | 1. 版本号应遵循 语义化版本规范 |

**核心原则与最佳实践**

1. 清晰一致：整个团队必须遵守同一套命名规范。
2. 可追溯：名称中包含任务 ID（如 Jira Issue Key, GitHub Issue #），便于将代码变更与需求、缺陷关联。
3. 简短达意：名称要能概括分支目的，避免使用模糊词汇。
4. 使用前缀分隔：使用 feature/、bugfix/等前缀，能直观地在 Git 工具中分类查看分支。

### 9.1.3 权限模型

| 分支类型                      |                                                                                                代码合并权限                                                                                                |                                 说明 |
| ----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | -----------------------------------: |
| develop分支（开发环境）       |                                                               禁止直接推送。必须通过Pull Request（PR）合并。PR需要至少一名其他开发者的批准。                                                               | 集成所有开发中的功能，进行初步测试。 |
| test分支（测试环境）          |                                   禁止直接推送。只能从develop分支合并过来（即测试环境接受来自开发环境的集成）。合并到test分支的PR可能需要测试负责人或集成工程师的批准。                                    |   用于集成测试和系统测试，相对稳定。 |
| 预发布环境（对应release分支） | 禁止直接推送。只能从test分支创建release分支（即预发布环境对应一个release分。在release分支上的修改（如修复预发布环境发现的bug）应通过PR，并需要至少两名核心成员的批准（包括测试负责人和开发负责人）。支）。 |         模拟生产环境，进行最终验证。 |
| main分支（生产环境）          |                                                         禁止直接推送。只能从release分支或hotfix分支合并过来。合并必须由发布负责人或运维团队执行。                                                          |                 生产环境，必须稳定。 |

1. develop 环境（开发集成环境）

目标：快速集成、早期发现问题、为测试团队提供稳定版本

```yaml
分支保护规则（develop）：
- ✅ 强制要求：Pull Request
- ✅ 至少需要：1 名代码评审者批准
- ✅ 强制要求：代码检测
- ❌ 不允许：直接推送
- ❌ 不允许：强制推送
- ✅ 允许：开发者创建 feature 分支
- ✅ 允许：所有人创建 PR

部署权限：
- ✅ 自动触发：合并到 develop 后自动部署
- ✅ 手动触发：开发负责人可手动触发重新部署
- ❌ 不允许：普通开发者手动部署
```

2. test 环境（测试环境）

目标：系统集成测试、回归测试、性能测试、安全扫描

```yaml
分支保护规则（test）：
- ✅ 强制要求：必须从 develop 合并
- ✅ 至少需要：2 名评审者批准
- ❌ 不允许：直接推送
- ❌ 不允许：从 feature 分支直接合并
- ✅ 允许：测试负责人创建测试分支
- ✅ 允许：紧急修复（需特别审批）

部署权限：
- ✅ 计划部署：每周固定时间窗口
- ✅ 手动触发：测试负责人、发布经理
- ✅ 自动回滚：测试失败自动回滚到上一版本
- ❌ 不允许：开发人员单独部署
```

3. 预发布环境（Staging/Pre-production）

目标：完全镜像生产环境，最终验收

```yaml
分支管理规则（release/*）：
- ✅ 强制要求：必须从 test 创建
- ✅ 创建权限：仅发布经理或技术负责人
- ✅ 修改权限：核心开发团队成员
- ❌ 不允许：普通开发者提交代码
- ✅ 必须通过：人工验收确认
- ⏰ 冻结期：发布前 24 小时代码冻结

部署权限：
- ✅ 部署权限：仅发布经理、运维团队
- ❌ 不允许：非计划部署
- 🔄 回滚计划：必须有完整的回滚方案
```

## 9.2 流程规范 大团队建议

### 9.2.1 开发流程

#### 1、功能开发阶段

1. 开始新功能：决定开发一个新功能。
2. 创建功能分支：从 develop（主开发分支）创建一个新的 feature/\*分支。
3. 功能开发：在该 feature分支上进行代码开发。
4. 完成开发确认：判断功能是否开发完成。

- 若未完成：返回第3步，继续开发。
- 若已完成：进入下一步。

#### 2、开发环境集成与验证

5. 发起代码评审：为该功能分支创建一个 Pull Request，请求合并到 develop分支。
6. 进行代码评审：团队对代码进行审查。
7. 合并到开发主线：评审通过后，将该功能分支合并到 develop分支。
8. 部署到开发环境：将更新后的 develop分支部署到开发环境。
9. 开发环境验证：在开发环境中进行基本功能验证。
10. 验证问题判断

- 若发现问题：从 develop分支创建一个 bugfix/\*分支进行修复。修复完成后，返回第3步（以修复开发的形式）继续流程。
- 若验证通过：进入下一步。

#### 3、测试环境集成与测试

11. 同步至测试分支：将验证通过的 develop分支合并到 test分支。
12. 部署到测试环境：将 test分支部署到测试环境。
13. 正式测试：由测试团队在测试环境中进行系统集成测试。
14. 测试结果判断：（性能测试、安全测试 等）

- 若测试不通过：从 develop分支创建一个 bugfix/\*分支来修复测试发现的缺陷。修复完成后，返回第3步，重新开始开发和验证流程。
- 若测试通过：进入发布准备阶段。

#### 4、预发布与最终验证

15. 创建发布分支：从 test 分支创建一个 release/\*分支，用于发布准备。
16. 部署到预发布环境：将该 release分支部署到仿真生产环境的预发布环境。
17. 最终验证：进行上线前的最终验证（如用户验收测试）。
18. 最终验证判断：

- 若验证不通过：
  - 从 release/\*分支 创建 hotfix/\*分支来修复测试发现的缺陷。修复完成后，为该功能分支创建一个 Pull Request，请求合并到 release/\*分支。
  - 返回第18步继续流程。
- 若验证通过：
  - 进入发布阶段。
  - 存在 hotfix/\*分支，则 将修复提交 cherry-pick 到 develop分支，并执行第11步。

#### 5、生产发布

20. 合并到生产主线：将最终验证通过的 release分支合并到 main分支。
21. 打标签并发布：在 main分支上打上版本标签，并正式发布到生产环境。

![git提交流程](/git/git-development-process-1.png)

### 9.2.2 详细操作步骤

#### 第一步：功能开发

```bash
# 1. 拉取最新develop代码
git checkout develop
git pull origin develop

# 2. 创建功能分支
git checkout -b feature/user-authentication

# 3. 开发并提交代码
git add .
git commit -m "feat: 添加用户认证功能

- 实现JWT登录
- 添加权限验证中间件
- 完善错误处理"

# 4. 推送到远程
git push origin feature/user-authentication
```

#### 第二步：创建Pull Request

PR是守护代码库质量、实现团队高效协作的标准化沟通与审查网关。

::: tip
PR的实际必要性在于：它为代码合并设立了一个强制性的、公开的审查与共识形成过程，是保障代码质量、促进团队协作和知识共享的关键防线，确保没有未经过集体审视的代码能进入共享代码库。
:::

PR模板：

```bash
## 功能描述
[简要描述功能]

## 变更内容
- [x] 功能1
- [x] 功能2
- [ ] 功能3

## 测试验证
- [x] 单元测试通过
- [x] 集成测试通过
- [x] 手动测试完成

## 相关issue
Closes #123

## 截图（如有）
![截图](url)

## 部署说明
- 需要新增环境变量：JWT_SECRET
- 数据库迁移：是/否
```

#### 第二步：创建Pull Request 合并到 develop

```bash
# 1. 确保本地develop是最新的
git checkout develop
git pull origin develop

# 2. 合并功能分支（使用no-ff保留分支历史）
git merge --no-ff feature/user-authentication

# 3. 推送develop到远程
git push origin develop

# 4. 部署到开发环境
# （CI/CD自动触发）
```

### 9.2.2 测试环境流程

#### 1 从develop合并到test

```bash
# 1. 切换到test分支
git checkout test

# 2. 拉取最新test代码
git pull origin test

# 3. 合并develop到test
git merge develop --no-ff -m "chore: 合并develop到test进行测试"

# 4. 推送test分支
git push origin test

# 5. CI/CD自动部署到测试环境
```

### 9.2.3 预发布环境流程

#### 1 创建release分支

```bash
# 1. 从最新的test分支创建release分支
git checkout test
git pull origin test
git checkout -b release/v1.2.0

# 2. 更新版本号
# package.json 或类似文件
{
  "version": "1.2.0",
  "description": "预发布版本v1.2.0"
}

# 3. 提交版本更新
git add .
git commit -m "chore: 发布v1.2.0版本"

# 4. 推送到远程
git push origin release/v1.2.0
```

#### 2 预发布环境验证

#### 3 合并到main分支

```bash
# 1. 切换到main分支
git checkout main
git pull origin main

# 2. 合并release分支到main
git merge --no-ff release/v1.2.0 -m "chore: 发布v1.2.0正式版本"

# 3. 打标签
git tag -a v1.2.0 -m "版本v1.2.0正式发布"

# 4. 推送main和标签
git push origin main
git push origin --tags

# 5. 删除release分支
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

### 9.2.4 紧急修复流程

#### 1. 预发布环境bug修复

```bash
# 如果是预发布环境发现的bug
# 1. 从release分支创建hotfix修复分支
git checkout release/v1.2.0
git checkout -b hotfix/fix-***-bug

# 2. 修复bug并提交
git add .
git commit -m "fix: 修复***错误"

# 3. 合并回release分支
git checkout release/v1.2.0
git merge --no-ff hotfix/fix-***-bug

# 4. 重新验证后合并到main

# 5. 重新验证后将修复提交 cherry-pick 到 develop分支
```

#### 2. 生产环境bug修复

```bash
# 如果是生产环境发现的bug
# 1. 从main分支创建hotfix修复分支 并拉取最新代码
git checkout main
git pull origin main

# 2. 创建hotfix分支，命名规范：hotfix/紧急修复描述-bug
git checkout -b hotfix/fix-***-bug

# 3. 修复bug并提交
git add .
git commit -m "fix: 修复***错误"

# 4. 重新验证后合并到main分支
git checkout main
git merge --no-ff hotfix/fix-***-bug

# 5. 重新验证后将修复提交 cherry-pick 到 develop分支
```

### 9.2.5 紧急需求 参考 生产环境bug修复流程

## 9.3 流程规范（简化） 小团队建议

### 9.3.1 开发流程

#### 1、功能开发阶段

1. 开始新功能：决定开发一个新功能。
2. 创建功能分支：从 develop（主开发分支）创建一个新的 feature/\*分支。
3. 功能开发：在该 feature分支上进行代码开发。
4. 完成开发确认：判断功能是否开发完成。

- 若未完成：返回第3步，继续开发。
- 若已完成：进入下一步。

#### 2、开发环境集成与验证

5. 合并到开发主线：将该功能分支合并到 develop分支。
6. 部署到开发环境：将更新后的 develop分支部署到开发环境。
7. 开发环境验证：在开发环境中进行基本功能验证。
8. 验证问题判断

- 若发现问题：从 develop分支创建一个 bugfix/\*分支进行修复。修复完成后，返回第3步（以修复开发的形式）继续流程。
- 若验证通过：进入下一步。

#### 3、测试环境集成与测试

develop 合并至 test 根据项目考虑 是否发起 rp

9.  发起代码评审：为该功能分支创建一个 Pull Request，请求合并到 test分支。
10. 进行代码评审：团队对代码进行审查。
11. 同步至测试分支：将验证通过的 develop分支合并到 test分支。
12. 部署到测试环境：将 test分支部署到测试环境。
13. 正式测试：由测试团队在测试环境中进行系统集成测试。
14. 测试结果判断：（性能测试、安全测试 等）

- 若测试不通过：从 develop分支创建一个 bugfix/\*分支来修复测试发现的缺陷。修复完成后，返回第3步，重新开始开发和验证流程。
- 若测试通过：进入发布准备阶段。

#### 4、最终验证与生产发布

16. 合并到生产主线：将最终验证通过的 test分支合并到 main分支。
17. 最终验证判断：

- 若验证不通过：
  - 从 main分支 创建 hotfix/\*分支来修复测试发现的缺陷。修复完成后，为该功能分支创建一个 Pull Request，请求合并到 main分支。
  - 返回第17步继续流程。
- 若验证通过：
  - 进入发布阶段。
  - 存在 hotfix/\*分支，则 将修复提交 cherry-pick 到 develop分支，并执行第5步。

18. 打标签并发布：在 main分支上打上版本标签，并正式发布到生产环境。

![git提交简化流程](/git/git-development-process-simplify.png)

## 9.4 Commit message 格式

**`<type>(<scope>): <subject>`**

commit message 目的是为了清晰明了的体现本次提交的内容，以及提交的目的。

但在日常开发中，大家的commit message千奇百怪，中英文混合使用，或者干脆就敷衍了事。这就导致后续代码维护成本特别大，追溯时，连开发者都不知道自己改了什么。

基于以上这些问题，我们希望通过某种方式来监控用户的git commit message，让规范更好的服务于质量，提高大家的研发效率。

- 用于说明git commit的类别，只允许使用下面的标识。
- feat：新功能（feature）。
- fix/to：修复bug，可以是QA发现的BUG，也可以是研发自己发现的BUG。
  - fix：产生diff并自动修复此问题。适合于一次提交直接修复问题
  - to：只产生diff不自动修复此问题。适合于多次提交。最终修复问题提交时使用fix
- docs：文档（documentation）。
- style：格式（不影响代码运行的变动）。
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）。
- perf：优化相关，比如提升性能、体验。
- test：增加测试。
- chore：构建过程或辅助工具的变动。
- revert：回滚到上一个版本。
- merge：代码合并。
- sync：同步主线或分支的Bug。

### 9.3.1 scope(可选)

这里是否必须，以及范围是什么内容，可以看实际公司的情况。

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层、任务号 等等，视项目不同而不同，推荐使用任务号！

### 9.3.2 subject(必须)

subject是commit目的的简短描述，不超过50个字符。

- 结尾不加句号或其他标点符号。
- 根据以上规范git commit message将是如下的格式：

```bash
feat(Controller): 用户查询接口开发
feat(1234): 用户查询缺少username属性
```

以上就是我们梳理的git commit规范，那么我们这样规范git commit到底有哪些好处呢？

- 便于程序员对提交历史进行追溯，了解发生了什么情况。
- 一旦约束了commit message，意味着我们将慎重的进行每一次提交，不能再一股脑的把各种各样的改动都放在一个git commit里面，这样一来整个代码改动的历史也将更加清晰。
- 格式化的commit message才可以用于自动化输出Change log。
