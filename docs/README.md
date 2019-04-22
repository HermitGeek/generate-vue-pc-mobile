### 已完成

- 支持 sass、scss、less

- CSS: styleLint、csscomb、postcss 转换、校验

- JS: babel7 + eslint + airbnb 转换、校验

- 终端执行 `npm run eslint:fix`；自动调整不符合规范的JS

    > 官方：只有带小扳手的属性 才能被自动调整

- 开发环境下 webpack 热加载、热替换

- 生产环境下 JS 摇树优化

- 生产环境下 分离css
    
- 支持 Jenkins 自动化部署（和之前机制一样）

- 支持 CDN发布（和之前机制一样）

- 本地打包后 可视化打包体积分布

- 增加 .vscode 插件配置文件

- 增加 数据处理方法 `$format`

- 增加 基础视图组件 `base-chart`、`base-loading`、`base-scroll`



### 改动

- 多个单页应用 改成 一个单页应用

- jQuery发请求 改成 axios发请求 

    > axios API 有别于 jQuery API（开发时 需查阅相关文档）

    > 通过状态树API发请求 改成 挂载到vue实例下的 `$http` 发请求

- 路径缩写: 之前的 `@components` 改成 `@common`

- common 模块 不需要再打 dll 包

- 项目打包 部署前，不用再手动清空上一次打包记录（已配置成 自动清空）

- 关于打包机制 更多的遵循 webpack默认的打包优化机制

- 简化 构建环境变量的配置；位于 `configs` 文件夹下

- UI组件库 改成 按需引入；位于 `common/widgets/$iview`

- 字体图标 统一使用 `font-awesome`（按需引入）；位于 `common/widgets/$icons`


### 待完成

- vscode 创建列表

- 优化 $http 请求方法

- 移动端 解决方案

- 服务端渲染

