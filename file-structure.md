# 项目文件结构说明

## 📁 项目目录结构

```
dashboard-project/
├── index.html              # 主页面文件
├── css/
│   └── carousel.css        # 轮播图样式文件
├── js/
│   └── carousel.js         # 轮播图脚本文件
├── img/                    # 图片资源文件夹
│   ├── 610f195eb07dcb9e8b82753393c0da93.jpg@h_1280
│   ├── 641.webp
│   ├── v2-9492c3223b93bcbe6e86faa5b18b1d08_r.jpg
│   └── zr7YrzSBsg6AIjkHKICRoq79t1SeEv0Vuqmg8EcrbLQXyPEkpUqfdIUZwCbbB1Xz.jpg
├── README.md               # 项目说明文档
├── carousel-guide.md       # 轮播图使用指南
├── weave-carousel-guide.md # 传统编织风格轮播图说明
└── structure.txt           # 项目结构说明
```

## 📄 文件说明

### 🏠 主页面文件
- **`index.html`** - 主页面文件，包含HTML结构和外部资源引用

### 🎨 样式文件
- **`css/carousel.css`** - 轮播图的所有CSS样式
  - 传统编织风格设计
  - 响应式布局
  - 动画效果
  - 交互样式

### ⚡ 脚本文件
- **`js/carousel.js`** - 轮播图的所有JavaScript功能
  - 轮播图初始化
  - 交互事件处理
  - 触摸支持
  - 动画效果

### 🖼️ 资源文件
- **`img/`** - 图片资源文件夹
  - 包含4张轮播图片
  - 支持多种格式（jpg, webp）

### 📚 文档文件
- **`README.md`** - 项目总体说明
- **`carousel-guide.md`** - 轮播图功能指南
- **`weave-carousel-guide.md`** - 传统编织风格设计说明
- **`structure.txt`** - 项目结构说明

## 🔧 代码组织优势

### ✅ 分离关注点
- **HTML** - 专注于结构和内容
- **CSS** - 专注于样式和布局
- **JavaScript** - 专注于交互和功能

### ✅ 维护性
- 样式修改只需编辑 `css/carousel.css`
- 功能修改只需编辑 `js/carousel.js`
- 结构修改只需编辑 `index.html`

### ✅ 可重用性
- CSS文件可以在其他页面中重复使用
- JavaScript文件可以模块化引用
- 便于团队协作开发

### ✅ 性能优化
- 浏览器可以缓存CSS和JS文件
- 减少HTML文件大小
- 支持并行加载

## 🚀 使用方法

### 1. 直接使用
```bash
# 在浏览器中打开
open index.html
```

### 2. 本地服务器
```bash
# 使用Python启动本地服务器
python -m http.server 8000

# 访问 http://localhost:8000
```

### 3. 修改样式
```bash
# 编辑轮播图样式
vim css/carousel.css
```

### 4. 修改功能
```bash
# 编辑轮播图功能
vim js/carousel.js
```

## 📝 开发建议

### 样式开发
- 在 `css/carousel.css` 中添加新样式
- 使用CSS变量便于主题切换
- 保持响应式设计原则

### 功能开发
- 在 `js/carousel.js` 中添加新功能
- 使用模块化编程思想
- 添加错误处理和性能优化

### 内容更新
- 在 `index.html` 中更新HTML结构
- 在 `img/` 文件夹中替换图片
- 更新文档说明

## 🔍 文件依赖关系

```
index.html
├── 依赖: css/carousel.css
├── 依赖: js/carousel.js
├── 依赖: img/*.jpg, *.webp
└── 依赖: CDN资源 (Tabler CSS/JS)
```

## 💡 最佳实践

1. **保持文件结构清晰**
2. **使用语义化的文件名**
3. **添加适当的注释**
4. **遵循代码规范**
5. **定期备份重要文件**

这样的文件结构使项目更加专业、易于维护和扩展！
