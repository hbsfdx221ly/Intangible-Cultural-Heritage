import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import https from 'https';

const app = express();
const db = new Database('auth.db');

app.use(cors());
app.use(express.json());

// 初始化表
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL
)`).run();

// 注册
app.post('/api/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password || String(password).length < 6) {
    return res.status(400).json({ ok: false, message: '参数无效' });
  }
  try {
    const hash = bcrypt.hashSync(String(password), 10);
    db.prepare('INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)')
      .run(String(username), hash, Date.now());
    return res.json({ ok: true });
  } catch (e) {
    if (String(e.message || '').includes('UNIQUE')) {
      return res.status(409).json({ ok: false, message: '账号已存在' });
    }
    return res.status(500).json({ ok: false, message: '注册失败' });
  }
});

// 登录
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, message: '参数无效' });
  }
  const row = db.prepare('SELECT id, username, password_hash FROM users WHERE username = ?')
    .get(String(username));
  if (!row) {
    return res.status(401).json({ ok: false, message: '账号或密码错误' });
  }
  const match = bcrypt.compareSync(String(password), row.password_hash);
  if (!match) {
    return res.status(401).json({ ok: false, message: '账号或密码错误' });
  }
  return res.json({ ok: true, user: { id: row.id, username: row.username } });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`Auth server running on http://localhost:${PORT}`));

// 简易抓取接口：聚合维基百科摘要与搜索链接
// 增强：加入内存缓存与更快的 related 接口
const scrapeCache = new Map(); // key: topic, value: { ts, data }
const SCRAPE_TTL_MS = 1000 * 60 * 30; // 30 分钟

app.get('/api/scrape', (req, res) => {
  const topic = String(req.query.topic || '').trim();
  if (!topic) return res.status(400).json({ ok: false, message: '缺少 topic 参数' });

  // 命中缓存
  const cached = scrapeCache.get(topic);
  if (cached && (Date.now() - cached.ts) < SCRAPE_TTL_MS) {
    return res.json(cached.data);
  }

  const wikiSummaryUrl = `https://zh.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;
  const wikiRelatedUrl = `https://zh.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(topic)}`;

  function getJson(url) {
    return new Promise((resolve, reject) => {
      const req = https.request(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'dashboard-project/1.0 (local dev) contact: dev@example.com',
          'Accept': 'application/json'
        },
        timeout: 6000
      }, (resp) => {
        if (resp.statusCode && resp.statusCode >= 400) {
          return reject(new Error('HTTP ' + resp.statusCode));
        }
        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      });
      req.on('timeout', () => { req.destroy(new Error('timeout')); });
      req.on('error', reject);
      req.end();
    });
  }

  Promise.all([
    getJson(wikiSummaryUrl).catch(() => null),
    getJson(wikiRelatedUrl).catch(() => null)
  ]).then(([summaryResp, relatedResp]) => {
    let summary = '';
    if (summaryResp) {
      summary = summaryResp.extract || summaryResp.description || summaryResp.title || '';
      const html = summaryResp.extract_html || '';
      if (!summary && html) {
        summary = String(html).replace(/<[^>]+>/g, '');
      }
    }

    const links = [];
    if (relatedResp && Array.isArray(relatedResp.pages)) {
      for (let i = 0; i < Math.min(8, relatedResp.pages.length); i++) {
        const p = relatedResp.pages[i];
        const url = p && p.content_urls && p.content_urls.desktop && p.content_urls.desktop.page;
        if (p && p.title && url) links.push({ title: p.title, url });
      }
    }

    if (summary || links.length) {
      const payload = { ok: true, topic, summary, links };
      scrapeCache.set(topic, { ts: Date.now(), data: payload });
      return res.json(payload);
    }
    throw new Error('empty');
  }).catch(async (err) => {
    // 回退方案：使用公开文本提取服务（只作教学/演示）
    try {
      const fallbackUrl = `https://r.jina.ai/http://zh.wikipedia.org/zh-cn/${encodeURIComponent(topic)}`;
      const text = await new Promise((resolve, reject) => {
        const req = https.request(fallbackUrl, { headers: { 'User-Agent': 'dashboard-project/1.0' }, timeout: 10000 }, (resp) => {
          if (resp.statusCode && resp.statusCode >= 400) return reject(new Error('HTTP ' + resp.statusCode));
          let data = '';
          resp.on('data', (c) => data += c);
          resp.on('end', () => resolve(data));
        });
        req.on('timeout', () => { req.destroy(new Error('timeout')); });
        req.on('error', reject);
        req.end();
      });
      const cleaned = String(text || '')
        .replace(/\s+URL\s+Source:[\s\S]*/i, '')
        .replace(/\[(?:跳转到内容|主页|分类索引)[\s\S]*$/i, '')
        .replace(/https?:\/\/\S+/g, '')
        .trim()
        .slice(0, 500);
      const payload = { ok: true, topic, summary: cleaned, links: [] };
      scrapeCache.set(topic, { ts: Date.now(), data: payload });
      return res.json(payload);
    } catch (e) {
      return res.status(500).json({ ok: false, message: '聚合失败或网络受限' });
    }
  });
});


