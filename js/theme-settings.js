// 主题设置：应用与持久化
(function () {
    const STORAGE_KEY = 'dashboard_theme_settings_v1';

    const defaultSettings = {
        mode: 'light',            // light | dark
        primary: '#2f77ff',       // 主色
        font: 'system',           // system | serif | mono
        radius: 1                 // 0 | 0.5 | 1 | 1.5 | 2 (rem)
    };

    const state = loadSettings();

    document.addEventListener('DOMContentLoaded', () => {
        initColorSwatches();
        restoreControls();
        applySettings(state);

        const applyBtn = document.getElementById('ts-apply');
        if (applyBtn) {
            applyBtn.addEventListener('click', onApply);
        }
    });

    function onApply() {
        const mode = getCheckedValue('ts-color-mode') || state.mode;
        const font = getCheckedValue('ts-font') || state.font;
        const radius = parseFloat(getCheckedValue('ts-radius') || state.radius);
        const primary = getSelectedSwatch() || state.primary;

        const next = { mode, font, radius, primary };
        saveSettings(next);
        applySettings(next);

        // 关闭模态框
        const modalEl = document.getElementById('themeSettingsModal');
        if (modalEl) {
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.hide();
        }
    }

    function applySettings(settings) {
        const root = document.documentElement;
        const body = document.body;

        // 模式
        if (settings.mode === 'dark') {
            body.setAttribute('data-bs-theme', 'dark');
        } else {
            body.removeAttribute('data-bs-theme');
        }

        // 主色（影响按钮/链接等）
        root.style.setProperty('--tblr-primary', settings.primary);
        root.style.setProperty('--bs-primary', settings.primary);

        // 字体族
        const fontStacks = {
            system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            serif: "Georgia, 'Times New Roman', Times, serif",
            mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
        };
        root.style.setProperty('--app-font-family', fontStacks[settings.font] || fontStacks.system);
        document.body.style.fontFamily = `var(--app-font-family)`;

        // 圆角
        const radiusRem = `${settings.radius}rem`;
        const radiusVars = ['--tblr-border-radius', '--bs-border-radius', '--bs-border-radius-md', '--bs-border-radius-lg'];
        radiusVars.forEach(v => root.style.setProperty(v, radiusRem));
    }

    function getCheckedValue(name) {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : undefined;
    }

    function saveSettings(settings) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
            Object.assign(state, settings);
        } catch (e) {
            console.warn('保存主题设置失败:', e);
        }
    }

    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { ...defaultSettings };
            return { ...defaultSettings, ...JSON.parse(raw) };
        } catch (e) {
            return { ...defaultSettings };
        }
    }

    function restoreControls() {
        // 模式
        const modeInput = document.querySelector(`input[name="ts-color-mode"][value="${state.mode}"]`);
        if (modeInput) modeInput.checked = true;

        // 字体
        const fontInput = document.querySelector(`input[name="ts-font"][value="${state.font}"]`);
        if (fontInput) fontInput.checked = true;

        // 圆角
        const radiusInput = document.querySelector(`input[name="ts-radius"][value="${state.radius}"]`);
        if (radiusInput) radiusInput.checked = true;

        // 主色
        const swatches = document.querySelectorAll('#ts-color-swatches button[data-color]');
        swatches.forEach(btn => {
            if (btn.getAttribute('data-color') === state.primary) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function initColorSwatches() {
        const colors = [
            '#2f77ff', '#22b8cf', '#12b886', '#82c91e', '#fab005', '#fa5252', '#d6336c', '#7950f2', '#ff922b'
        ];
        const wrap = document.getElementById('ts-color-swatches');
        if (!wrap) return;
        wrap.innerHTML = '';
        colors.forEach(color => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn p-0';
            btn.setAttribute('data-color', color);
            btn.setAttribute('aria-label', color);
            btn.style.width = '28px';
            btn.style.height = '28px';
            btn.style.borderRadius = '50%';
            btn.style.border = '2px solid rgba(0,0,0,0.1)';
            btn.style.background = color;
            btn.addEventListener('click', () => {
                // 仅一个激活
                wrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            wrap.appendChild(btn);
        });

        // 选中当前主色
        setTimeout(restoreControls, 0);
    }

    function getSelectedSwatch() {
        const active = document.querySelector('#ts-color-swatches button.active');
        return active ? active.getAttribute('data-color') : undefined;
    }
})();


