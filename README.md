# Intangible-Cultural-Heritage
非物质文化遗产数据交互平台

## 项目简介

基于 Tabler 仪表板界面组件构建的非物质文化遗产数据交互平台，提供传统工艺展示、数据可视化等功能。

## 功能特性

- 🎨 传统编织风格轮播图展示
- 📊 数据可视化界面
- 🔐 用户认证系统
- 📱 响应式设计
- 🎯 主题设置功能

## 快速开始

### 启动后端服务
```bash
cd server
npm install
npm start
```

### 访问前端
直接在浏览器中打开 `index.html` 文件即可查看完整界面效果。

## 技术栈

- **前端**: HTML5, CSS3, JavaScript, Tabler UI
- **后端**: Node.js, Express
- **数据库**: SQLite
- **认证**: bcryptjs

## 项目结构

```
dashboard-project/
├── index.html          # 主页面
├── papercut.html       # 中国剪纸详情页
├── login.html          # 登录页面
├── register.html       # 注册页面
├── css/                # 样式文件
├── js/                 # 前端脚本
├── img/                # 图片资源
└── server/             # 后端服务
    ├── index.js        # 服务器入口
    ├── auth.db         # 用户数据库
    └── package.json    # 依赖配置
```

## 使用说明

1. 注册/登录用户账号
2. 浏览传统工艺轮播图
3. 点击"中国剪纸"标题查看详情
4. 使用主题设置调整界面风格

## 开发指南

### 添加新的工艺展示
1. 在 `index.html` 轮播图中添加新项
2. 创建对应的详情页面
3. 更新跳转链接

### 自定义样式
- 修改 `css/carousel.css` 调整轮播图样式
- 使用 Tabler 组件快速构建界面

## 许可证

MIT License
