### 概述

- 这是一个 多模块 的 单页应用 架构，适用于 pc、mobile 环境

- 提供统一的开发规范、构建脚本、基础配置和初始代码

- 内置前端集成解决方案，快速实现底层通用功能

### 目录结构


- 根目录

    ```
    ├── .vscode              # vscode 编辑器插件列表、配置
    ├── /configs             # 项目 构建配置
    │   ├── /base.conf.js    # 基础 构建配置
    │   ├── /dev.conf.js     # 开发模式 构建配置
    │   ├── /prod.conf.js    # 生产模式 构建配置
    ├── /dist                # 构建后文件
    ├── /docs                # 项目文档
    ├── /node_modules        # 项目依赖
    ├── /scripts             # 构建脚本
    │   ├── /jenkins         # jenkins 构建、部署 脚本
    │   ├── /webpack         # webpack 配置文件
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

- 配置路径

    ```
    ├── /configs             # 项目 构建配置
    │   ├── /base.conf.js    # 基础 构建配置（是否是 mobile 环境）
    │   ├── /dev.conf.js     # 开发模式 构建配置（环境变量、构建路径）
    │   ├── /prod.conf.js    # 生产模式 构建配置（环境变量、构建路径）   
    ```

- 项目路径

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
    │       ├── /views              # 通用 页面组件
    │           ├── /$app           # 通用模块 入口页面
    │           ├── /$demo          # 通用模块 demo页面
    │       ├── /widgets            # 通用 UI组件
    │           ├── /$icons         # fontawesome 配置
    │           ├── /$iview         # iview 配置（pc 端）
    │           ├── /$vant          # vant 配置（mobile 端）
    │           ├── /base-chart     # 图表组件（基于 echarts）
    │           ├── /base-loading   # loading 组件
    │           ├── /base-scroller  # 滚动条组件（统一 终端样式，内置滚动加载）
    │
    │   ├── /module1                # module1 模块
    │       ├── /utils              # 模块专属 脚本
    │       ├── /views              # 模块专属 页面组件
    │           ├── /$app           # 模块专属 入口页面
    │           ├── /$demo          # 模块专属 demo页面
    │       ├── /widgets            # 模块专属 UI组件
    ```


### 项目初始化




### 命令列表

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


### 相关约定

- 基于 axios 发送ajax 请求

- 字体图标 统一使用 `font-awesome`（按需引入）；位于 `common/widgets/$icons`

- UI组件库 改成 按需引入；位于 `common/widgets/$iview`





### 架构补充说明

- CSS
    - 规范: styleLint

    - 转换: postcss

    - 美化: csscomb

    - 预编译: sass、scss、less


- JavaScript
    - 规范: eslint + airbnb

    - 转换: babel7

    - 美化: jsbeautifier


- 支持 CDN发布资源

- 支持 Jenkins 自动化部署（需要后台配合）


- development 环境
    - webpack 热加载、热替换


- production 环境

    - JavaScript tree-shaking

    - CSS Extract



