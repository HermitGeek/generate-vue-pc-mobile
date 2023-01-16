## 概述

- 这是一个多模块的 Vue 单页应用架构，适用于 PC、Mobile 环境

- 提供统一的开发规范、构建脚本、基础配置、基础组件、初始代码

- 内置前端集成解决方案，快速实现底层通用功能

## 目录结构

- 根目录

    ```
    ├── /.vscode             # vscode 编辑器配置
    │   ├── /pluginList.md   # vscode 插件列表
    │   ├── /settings.json   # vscode 基础配置
    │   │
    ├── /configs             # 项目 构建配置
    │   ├── /base.conf.js    # 基础 构建配置
    │   ├── /dev.conf.js     # 开发模式 构建配置
    │   ├── /prod.conf.js    # 生产模式 构建配置
    │   │
    ├── /dist                # 构建后文件
    ├── /docs                # 项目文档
    ├── /node_modules        # 项目依赖
    ├── /scripts             # 构建脚本
    │   ├── /jenkins         # jenkins 构建、部署 脚本
    │   ├── /webpack         # webpack 配置文件
    │   │
    ├── /src                 # 项目路径
    ├── .csscomb.json        # csscomb 配置
    ├── .editorconfig        # editorconfig 配置
    ├── .eslintignore        # eslint 忽略的文件
    ├── .eslintrc            # eslint 配置
    ├── .gitignore           # git 忽略的文件
    ├── .jsbeautifyrc        # js 格式化配置
    ├── .stylelintrc         # css 格式化配置
    ├── .babel.config.js     # babel 配置
    ├── .jsconfig.json        
    ├── package-lock.json    # 锁定依赖包版本
    ├── package.json         # 项目组 npm 配置
    ├── postcss.config.js    # postcss 配置
    ```

- 配置目录

    ```
    ├── /configs             # 项目 构建配置
    │   ├── /base.conf.js    # 基础 构建配置（设备类型）
    │   ├── /dev.conf.js     # 开发模式 构建配置（环境变量、构建路径）
    │   ├── /prod.conf.js    # 生产模式 构建配置（环境变量、构建路径）   
    ```

- 项目目录

    ```
    ├── /src                       
    │   ├── /common                 # 通用 模块
    │       ├── /utils              # 通用 脚本
    │           ├── /$api-conf      # ajax API 配置
    │           ├── /$cache         # localforage 配置
    │           ├── /$dicts         # 数据字典 配置
    │           ├── /$handler       # 方法集
    │           ├── /$http          # ajax 封装方法
    │           ├── /$router        # 路由配置
    │           ├── /$store         # 状态树配置
    │           │
    │       ├── /views              # 通用 页面组件
    │           ├── /$app           # 通用模块 入口页面
    │           ├── /demo           # 通用模块 demo页面
    │           │
    │       ├── /widgets            # 通用 UI组件
    │           ├── /$icons         # fontawesome 配置
    │           ├── /$iview         # iview 配置（pc端）
    │           ├── /$vant          # vant 配置（mobile端）
    │           ├── /base-chart     # 图表组件（基于 echarts）
    │           ├── /base-loading   # loading 组件
    │           ├── /base-scroller  # 滚动条组件（统一 终端样式，内置滚动加载）
    │           │
    │   ├── /module1                # module1 模块
    │       ├── /utils              # 独立模块 脚本
    │       │
    │       ├── /views              # 独立模块 页面组件
    │           ├── /$app           # 独立模块 入口页面
    │           ├── /demo           # 独立模块 demo页面
    │           │
    │       ├── /widgets            # 独立模块 UI组件
    │       │
    │   ├── /index.html             # html 模板
    │   ├── /index~mobile.js        # 入口 JS（mobile端）
    │   ├── /index~pc.js            # 入口 JS（pc端）
    ```


## 开发约束

### 共同约束 

> 关于 路径

- 路径别名 `@src`：等同于 `/src`；项目中不允许 使用绝对路径

- 引入路径层级较多：尽量使用 `@src/`

> 关于 ajax

- 通用模块下 `$http` 是基于 axios 封装的通用方法，该方法被挂载到 vue实例下，接口配置位于 `@src/common/utils/$api-conf`

- 项目中发请求 均使用 `this.$http()`；状态树中发请求 需要引入 `$http` 文件


> 关于 `$router`

- 每个模块均有自己的 入口页面组件，即模块下的 `views/$app`；`@src/common/views/$app` 为通用模块 入口页面组件，层级最高

    ```
    页面组件层级：通用模块 `$app` > 通用模块 其他页面组件 = 独立模块 `$app` > 独立模块 其他页面组件
    ```

- 路由配置 `@src/common/utils/$router` 中，路由参数 `meta.keepAlive` 决定当前页面是否开启 `keep-alive` 缓存

- 路由配置 `@src/common/utils/$router` 中，路由参数 `meta.rank` 决定已缓存的页面，何时 动态销毁缓存（具体机制 见 路由配置代码）


> 关于 `$store`

- 在非必要情况下，避免使用状态管理方案（vuex）

- 状态树中定义的变量，均以 `$` 开头，与组件内变量的命名 做明显区分

- 避免 `getters` 直接返回 `state` 中的值，这种场景下 在组件中直接获取 `state` 中的值，是个不错的选择

> 关于 依赖包的引入

- dev开发者 不能擅自引入 依赖包，需master开发者确认

- 依赖包 能按需引入的一定要按需引入，如 `lodash`、`iview`、`fontawesome` 等等

    ```
    // 最佳实践

    import _cloneDeep from 'lodash/cloneDeep';
    ```

> 关于 代码校验

- 严格遵循 框架集成的 开发规范，如下
    > CSS
    - 规范: styleLint

    - 转换: postcss

    - 美化: csscomb

    - 预编译: scss（推荐）、sass、less

    > JavaScript
    - 规范: eslint + airbnb

    - 转换: babel7

    - 美化: jsbeautifier


- 不允许 `commit` 的代码 有规范错误，保存代码时会有错误提示（警告提示可忽略）

    > `commit` 代码前，先执行命令 `npm run eslint:fix`，查看项目中存在的代码规范错误，改正后再提交



### PC 端约束

- 使用 [iview](https://www.iviewui.com/) 组件库，相关配置位于 `@src/common/widgets/$iview`

- 使用 [fontawesome](https://fontawesome.com/) 字体图标，相关配置位于 `@src/common/widgets/$icons`

- 图片 **尽量压缩**，压缩用具 [TinyPNG](https://tinypng.com/)


### Mobile 端约束

- 避免使用过多的lib，以保证 mobile端页面性能；必要时可使用 [vant](https://youzan.github.io/vant/#/zh-CN/intro) 组件库，相关配置位于 `@src/common/widgets/$vant`

- 图片 **必须压缩**，压缩用具 [TinyPNG](https://tinypng.com/)；尽量使用 `jpg` 格式的图片，压缩率高

- 任何文件名、路径中 不得出现中文
    
- mobile端设计稿 是以 `iPhone6/7/8` 屏幕为基准 的二倍图，设计稿宽度 750px，`dpr` 为 2

- 架构使用 `postcss-px-to-viewport`，对 `@src` 目录下的 CSS 代码中以 `px` 为单位的样式进行自动转换 成 `vm` 为单位的样式；项目开发时，CSS代码中直接写设计稿上量出来的 `px` 尺寸即可
    
    > 默认 `font` 及 `font` 开头的属性的 `px` 尺寸，不会被转换；所以 CSS代码中 `font` 相关 `px` 尺寸，应为设计稿的 `1/2`

    > 默认 CSS选择器 `.ignore-to-vw` 内的属性的 `px` 尺寸，不会被转换；所以相关属性的 `px` 尺寸，应为设计稿的 `1/2`



## 命令列表

> 如下命令，需要在项目根目录下执行

- `npm run serve:dev`

    以开发模式 本地运行项目

- `npm run serve:prod`
    
    以生产模式 本地运行项目

- `npm run build:dev`

    以开发模式 构建项目

- `npm run build:prod`

    以生产模式 构建项目

- `npm run build:show`

    以生产模式 构建项目，并可视化展示 打包后代码体积

- `npm run eslint:fix`

    根据 eslint、airbnb 规范 校验 JavaScript，并自动修复 部分问题



## 架构补充说明

- 支持 CDN资源发布

- 本地运行项目支持IP访问

- 支持 Jenkins 自动化部署

- 支持 可视化查看项目打包体积

- `npm run build:XXX` 之前自动清空上一次打包文件

- 项目打包机制：更多的遵循 webpack默认打包机制，在此基础上作如下调整
    > 分离 webpack `runtime` 代码

    > 每一个路由 单独打包

    > 生产环境下：分离css、tree-shaking、remove console 等

    > 开发环境下：webpack 热加载、热替换

    > autoprefixer 自动添加 css 属性前缀
