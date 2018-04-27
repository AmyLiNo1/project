### project项目用到的知识点
antd+dva+node+kao

### 目录结构
```bash
├── /dist/           # 项目打包后的文件
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件，编译后copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /mock/         # 数据mock
│ ├── /models/       # 数据模型
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.ejs
├── .editorconfig
├── .eslintrc        # Eslint配置
├── .gitignore
├── .roadhogrc.js    # roadhog配置
├── .roadhogrc.mock.js 
├── README.md
└── package.json     # 项目信息
```