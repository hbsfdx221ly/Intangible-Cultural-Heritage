# 轮播图功能说明

## 🎯 功能特性

### ✨ 核心功能
- **自动播放**：每4秒自动切换到下一张图片
- **平滑过渡**：使用CSS3动画实现流畅的切换效果
- **循环播放**：最后一张图片后自动回到第一张
- **响应式设计**：适配桌面端和移动端

### 🎮 交互控制
- **鼠标悬停暂停**：鼠标悬停时暂停自动播放
- **左右箭头按钮**：点击切换上一张/下一张
- **底部指示器**：点击直接跳转到指定图片
- **键盘控制**：使用左右箭头键控制切换
- **触摸滑动**：移动端支持左右滑动切换

### 🎨 视觉效果
- **淡入淡出**：图片切换时的平滑过渡
- **悬停缩放**：鼠标悬停时图片轻微放大
- **阴影效果**：轮播图容器带有优雅的阴影
- **渐变遮罩**：图片底部有渐变文字遮罩
- **动画指示器**：指示器有缩放和颜色变化动画

## 📱 响应式设计

### 桌面端（>768px）
- 图片高度：400px
- 控制按钮：50px圆形按钮
- 文字说明：完整显示

### 移动端（≤768px）
- 图片高度：250px
- 控制按钮：40px圆形按钮
- 文字说明：简化显示

## 🛠️ 技术实现

### HTML结构
```html
<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
    <!-- 指示器 -->
    <div class="carousel-indicators">...</div>
    
    <!-- 图片内容 -->
    <div class="carousel-inner">...</div>
    
    <!-- 控制按钮 -->
    <button class="carousel-control-prev">...</button>
    <button class="carousel-control-next">...</button>
</div>
```

### CSS样式
- 使用CSS3 `transition` 和 `transform` 实现平滑动画
- 使用 `@keyframes` 定义自定义动画
- 使用 `@media` 实现响应式布局

### JavaScript功能
- 使用Bootstrap Carousel API
- 自定义事件监听器
- 触摸事件处理
- 键盘事件处理

## 📂 图片文件

轮播图使用了以下4张图片：
1. `610f195eb07dcb9e8b82753393c0da93.jpg@h_1280` - 精彩瞬间
2. `641.webp` - 创意设计
3. `v2-9492c3223b93bcbe6e86faa5b18b1d08_r.jpg` - 艺术之美
4. `zr7YrzSBsg6AIjkHKICRoq79t1SeEv0Vuqmg8EcrbLQXyPEkpUqfdIUZwCbbB1Xz.jpg` - 视觉盛宴

## 🎯 使用方法

1. **自动播放**：页面加载后自动开始播放
2. **手动控制**：点击左右箭头或指示器
3. **键盘控制**：使用左右箭头键
4. **触摸控制**：在移动端左右滑动
5. **暂停播放**：鼠标悬停在轮播图上

## 🔧 自定义配置

可以通过修改JavaScript中的 `carouselOptions` 对象来调整配置：

```javascript
const carouselOptions = {
    interval: 4000,        // 自动播放间隔（毫秒）
    wrap: true,            // 是否循环播放
    touch: true,           // 是否支持触摸
    keyboard: true         // 是否支持键盘控制
};
```

## 📝 注意事项

1. 确保图片文件路径正确
2. 图片建议使用相同尺寸以获得最佳效果
3. 建议图片文件大小适中以提升加载速度
4. 在移动端测试触摸滑动功能
