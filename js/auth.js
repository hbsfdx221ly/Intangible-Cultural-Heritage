// 简易本地“数据库”与会话管理（localStorage）
(function () {
    const SESSION_KEY = 'app_session_v1';
    const API_BASE = (window.AUTH_API_BASE || 'http://localhost:8787');

    async function apiRegister(username, password) {
        const res = await fetch(`${API_BASE}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
            throw new Error(data.message || '注册失败');
        }
        return true;
    }

    async function apiLogin(username, password) {
        const res = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
            throw new Error(data.message || '账号或密码错误');
        }
        return data.user;
    }

    function setSession(username) {
        localStorage.setItem(SESSION_KEY, JSON.stringify({ username, ts: Date.now() }));
    }

    function clearSession() {
        localStorage.removeItem(SESSION_KEY);
    }

    function getSession() {
        try {
            const raw = localStorage.getItem(SESSION_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function requireAuth(redirectTo = 'login.html') {
        const s = getSession();
        if (!s || !s.username) {
            window.location.replace(redirectTo);
        }
    }

    // 暴露到全局
    window.AuthDB = {
        apiRegister,
        apiLogin,
        setSession,
        clearSession,
        getSession,
        requireAuth
    };
})();


