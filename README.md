# Tabler 仪表板界面组件搬运指南

## 🎯 图片中识别的主要组件

根据您提供的图片，界面包含以下核心组件：

### 1. **顶部导航栏**
- 水平导航菜单
- Logo 品牌区域
- 多个下拉菜单项
- 带红色"新的"徽章的主题设置

### 2. **页面头部区域**
- 页面预标题（"概述"）
- 主标题（"仪表板"）
- 右侧操作按钮组

### 3. **按钮组件**
- "新视图" 按钮（次要样式）
- "+ 创建新报告" 按钮（主要样式，带图标）

## 📁 需要搬运的核心文件

### SCSS 样式文件：
```
core/scss/layout/_navbar.scss          // 导航栏样式
core/scss/layout/_page.scss            // 页面布局样式
core/scss/layout/_page-header.scss     // 页面头部样式
core/scss/ui/_buttons.scss             // 按钮组件样式
core/scss/ui/_badges.scss              // 徽章组件样式
core/scss/ui/_nav.scss                 // 导航链接样式
core/scss/_variables.scss              // 变量定义
core/scss/_mixins.scss                 // 混入函数
core/scss/_core.scss                   // 核心样式入口
```

### HTML 模板文件：
```
shared/includes/layout/navbar.html           // 导航栏模板
shared/includes/layout/navbar-menu.html      // 导航菜单模板
shared/includes/layout/page-header.html     // 页面头部模板
shared/includes/ui/button.html              // 按钮模板
shared/includes/ui/badge.html               // 徽章模板
shared/includes/layout/header-actions/buttons.html // 头部按钮组
```

## 🚀 快速开始方法

### 方法一：CDN 方式（推荐）
1. 直接使用 `index.html` 文件
2. 无需安装任何依赖
3. 在浏览器中打开即可看到完整效果

### 方法二：手动编译 SCSS
1. 复制上述 SCSS 文件到您的项目
2. 安装 Sass 编译器：`npm install sass`
3. 编译样式：`sass scss/main.scss css/main.css`
4. 在 HTML 中引入编译后的 CSS

## 🎨 组件使用说明

### 导航栏结构：
```html
<header class="navbar navbar-expand-md navbar-light d-print-none">
    <div class="container-xl">
        <!-- Logo 区域 -->
        <h1 class="navbar-brand">...</h1>
        <!-- 导航菜单 -->
        <div class="navbar-nav flex-row order-md-last">
            <!-- 导航项 -->
        </div>
    </div>
</header>
```

### 页面头部结构：
```html
<div class="page-header d-print-none">
    <div class="container-xl">
        <div class="row g-2 align-items-center">
            <div class="col">
                <div class="page-pretitle">概述</div>
                <h2 class="page-title">仪表板</h2>
            </div>
            <div class="col-auto ms-auto d-print-none">
                <!-- 按钮组 -->
            </div>
        </div>
    </div>
</div>
```

### 徽章使用：
```html
<span class="badge badge-sm bg-red text-red-fg">新的</span>
```

### 按钮使用：
```html
<!-- 次要按钮 -->
<a href="#" class="btn">新视图</a>

<!-- 主要按钮（带图标） -->
<a href="#" class="btn btn-primary">
    <svg class="icon">...</svg>
    + 创建新报告
</a>
```

## 📋 完整文件清单

要完整复制图片中的界面，您需要以下文件：

### 必需的核心文件：
1. `core/scss/_variables.scss` - 颜色和尺寸变量
2. `core/scss/layout/_navbar.scss` - 导航栏样式
3. `core/scss/layout/_page.scss` - 页面布局
4. `core/scss/layout/_page-header.scss` - 页面头部
5. `core/scss/ui/_buttons.scss` - 按钮样式
6. `core/scss/ui/_badges.scss` - 徽章样式
7. `core/scss/ui/_nav.scss` - 导航样式

### 可选文件（用于自定义）：
- `core/scss/_mixins.scss` - 混入函数
- `core/scss/_core.scss` - 主入口文件
- 各种 HTML 模板文件（用于参考）

## 💡 使用建议

1. **从 CDN 开始**：先使用 `index.html` 快速看到效果
2. **逐步自定义**：熟悉后可以下载 SCSS 文件进行自定义
3. **按需选择**：根据实际需求选择需要的组件文件
4. **保持更新**：定期更新 Tabler 版本以获得最新功能

现在您可以直接打开 `dashboard-project/index.html` 文件查看完整的仪表板界面效果！
