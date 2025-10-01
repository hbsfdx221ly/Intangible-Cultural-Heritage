/**
 * 传统编织风格轮播图增强脚本
 * 提供平滑过渡、触摸支持和传统工艺交互效果
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播图元素
    const carousel = document.getElementById('carouselExample');
    
    if (!carousel) {
        console.warn('轮播图元素未找到');
        return;
    }
    
    // 配置轮播图选项 - 传统编织风格
    const carouselOptions = {
        interval: 3000,        // 自动播放间隔3秒，更符合传统节奏
        wrap: true,            // 循环播放
        touch: true,           // 支持触摸滑动
        keyboard: true         // 支持键盘控制
    };
    
    // 初始化轮播图
    const carouselInstance = new bootstrap.Carousel(carousel, carouselOptions);
    
            // 传统编织风格的平滑过渡效果
            carousel.addEventListener('slide.bs.carousel', function (event) {
                // 移除会导致闪烁的滤镜变化效果
                // 保持平滑的过渡，不改变滤镜
            });
    
    // 添加鼠标悬停暂停功能
    carousel.addEventListener('mouseenter', function() {
        carouselInstance.pause();
    });
    
    carousel.addEventListener('mouseleave', function() {
        carouselInstance.cycle();
    });
    
    // 添加键盘控制
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            carouselInstance.prev();
        } else if (event.key === 'ArrowRight') {
            carouselInstance.next();
        }
    });
    
    // 增强触摸滑动支持（移动端）
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
        carouselInstance.pause();
    });
    
    carousel.addEventListener('touchmove', function(event) {
        if (isDragging) {
            event.preventDefault();
        }
    });
    
    carousel.addEventListener('touchend', function(event) {
        if (isDragging) {
            endX = event.changedTouches[0].clientX;
            handleSwipe();
            isDragging = false;
            carouselInstance.cycle();
        }
    });
    
    function handleSwipe() {
        const threshold = 60; // 增加滑动阈值，更符合传统操作
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // 向左滑动，显示下一张
                carouselInstance.next();
            } else {
                // 向右滑动，显示上一张
                carouselInstance.prev();
            }
        }
    }
    
    // 传统编织风格指示器点击效果
    const indicators = carousel.querySelectorAll('.carousel-indicators button');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            // 添加传统编织点击动画效果
            this.style.transform = 'scale(0.7)';
            this.style.background = 'linear-gradient(135deg, #CD853F, #DEB887)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1.3)';
                this.style.background = 'linear-gradient(135deg, #D2691E, #CD853F)';
            }, 200);
        });
    });
    
            // 图片加载完成后的简单显示
            const images = carousel.querySelectorAll('.carousel-image');
            images.forEach((img, index) => {
                img.addEventListener('load', function() {
                    // 移除会导致闪烁的滤镜变化
                    // 图片加载完成后直接显示
                    this.style.opacity = '1';
                });
            });
    
    // 添加传统编织纹理动画
    function addWeaveAnimation() {
        const weavePattern = carousel.querySelector('.carousel::before');
        if (weavePattern) {
            setInterval(() => {
                const opacity = Math.random() * 0.3 + 0.1;
                carousel.style.setProperty('--weave-opacity', opacity);
            }, 3000);
        }
    }
    
    // 启动编织纹理动画
    addWeaveAnimation();
    
    // 添加传统工艺音效提示（可选）
    function playWeaveSound() {
        // 这里可以添加传统工艺相关的音效
        console.log('传统编织工艺展示中...');
    }
    
    // 轮播切换时播放音效
    carousel.addEventListener('slid.bs.carousel', function() {
        playWeaveSound();
    });

    // 为标题为“中国剪纸”的项绑定点击跳转到 papercut.html
    (function bindPapercutNavigation(){
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach(function(item){
            const titleEl = item.querySelector('.carousel-caption h5');
            if (!titleEl) return;
            const title = (titleEl.textContent || '').trim();
            if (title === '中国剪纸') {
                // 整个项可点，排除控制按钮/指示器
                item.addEventListener('click', function(e){
                    const isControl = e.target.closest('.carousel-control-prev, .carousel-control-next, .carousel-indicators button');
                    if (isControl) return;
                    window.location.href = 'papercut.html';
                });
                // 提高可点击提示
                const targets = item.querySelectorAll('.carousel-image, .carousel-caption');
                targets.forEach(function(t){ try { t.style.cursor = 'pointer'; } catch(_) {} });
            }
        });
    })();
    
    // 错误处理
    carousel.addEventListener('error', function(event) {
        console.error('轮播图加载错误:', event);
    });
    
    // 性能优化：预加载下一张图片
    function preloadNextImage() {
        const activeIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => 
            item.classList.contains('active')
        );
        const nextIndex = (activeIndex + 1) % images.length;
        const nextImage = images[nextIndex];
        
        if (nextImage && !nextImage.complete) {
            const img = new Image();
            img.src = nextImage.src;
        }
    }
    
    // 定期预加载图片
    setInterval(preloadNextImage, 2000);
    
    console.log('传统编织风格轮播图初始化完成');
});
