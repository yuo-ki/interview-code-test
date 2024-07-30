Please put the HTTP web service code in this folder.
第一步：选择Node.js
Node.js具有http模块来创建简单的HTTP服务器
第二步：使用框架而不是http模块来实现HTTP服务器
框架提供了更高级的抽象和封装，集成了常用的功能模块和中间件，有更规范和清晰的代码结构，提供了更完善的错误处理机制。
如果选择http模块，需要处理繁琐的底层细节。
第三步：选择Express框架
Node.js项目可以选择的框架包括：Express、Koa、NestJS、Fastify、Hapi。
由于Express框架简单易用、适合初学者、灵活、资源丰富、适合处理小型简单任务，是构建web应用快速且轻量的框架，所以选择Express框架。

本地测试工具：postman

Debug过程总结：
Bug1:
Cannot read properties of undefined (reading 'taskName')
Solution:
代码中添加语句：app.use(express.json())

Bug2:
task添加失败: TypeError [ERR_INVALID_ARG_TYPE]: The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received an instance of Task
Solution:
转换传入fs模块文件处理方法的参数格式

有待优化的地方：
考虑时间原因，在实现用户认证时，代码中硬编码用户名和密码（明文存储不合适）
其他方式：1.从配置文件或数据库获取 2.JWT 3.单点登录 4.OAuth 5.会话Session
