###  项目简介

本项目是基于 SpringBoot2.x 和 Vue3 / React 的前后端分离的Java多租户权限管理系统。

| 项目名              | 说明           | 传送门                                                       |
| ------------------- | -------------- | ------------------------------------------------------------ |
| `sherly-springboot` | sherly后端项目 | <a rel="nofollow noreferrer" target="_blank" href="https://gitee.com/guzi499/sherly-springboot">sherly-springboot </a> |
| `sherly-vue3`       | sherly前端项目 | <a rel="nofollow noreferrer" target="_blank" href="https://gitee.com/guzi499/sherly-vue3">sherly-vue3 </a> |

多租户实现方案为 mysql 分库，解决了多租户数据隔离的问题，不同的租户使用不同的数据库，完美做到数据隔离。

其次，多租户分为主租户和购入租户，主租户可以管理其他所有租户的服务和用户量。根据购入租户的购买规模、购买服务来提供支持。

主租户实现功能后，可以根据需求将菜单、权限分给下属购入租户，购入租户拥有这些菜单、权限后，就可以使用对应的菜单、权限功能。

当前系统的功能有

- 系统管理
  - 租户管理 【mysql多租户数据分库，信息隔离】
  - 部门管理
  - 菜单管理 【使用SpringSecurity，权限精确到按钮，安全稳定】
  - 角色管理
  - 用户管理
- 系统监控
  - 在线用户 【精准监控，可踢人下线】
  - 操作日志 【包含正常日志和异常日志，易排错】
  - 登陆日志
- 系统配置
  - 邮件管理 【支持多种筛选方式，精准邮件投递】
    - 邮箱配置
    - 邮件发送
  - 对象存储 【支持S3规范所有云存储以及本地存储】
    - 存储配置
    - 内容管理

### 项目特色

- 支持可开关的自定义响应，方便测试环境下及时排查bug，避免查日志的困扰。同时生产环境一键关闭错误堆栈，面向用户更加友好。
- 支持S3规范下的所有云存储厂商，同时测试学习时可以使用本地存储。
- 支持Excel导出，可参考用户的导出，轻而易举的实现各种数据导出。
- 架构可向微服务拓展，支持参数注解校验，knife4j文档。

### 演示图片

<img src="assets/login.png" alt="image-20200927095842317" style="zoom:40%;" />



<img src="assets/menu.png" alt="image-20200927095842317" style="zoom:40%;" />

###  反馈交流

<img src="assets/wx.jpg" alt="image-20200927095842317" style="zoom:20%;" />

###  特别鸣谢

<img src="assets/jb_beam.png" alt="image-20200927095842317" style="zoom:20%;" />

感谢 <a rel="nofollow noreferrer" target="_blank" href="https://gitee.com/link?target=https%3A%2F%2Fjb.gg%2FOpenSourceSupport%2F%3Ffrom%3Dsherly-springboot">jetbrains </a>为团队提供的免费授权，希望大家能够支持jetbrains及其正版产品。

###  创作支持

如果觉得框架还不错，或者已经在使用了，希望你可以去 gitee 帮作者点个 ⭐ Star，这将是对作者极大的鼓励与支持！