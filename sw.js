/* =========================================================
   Service Worker —— JWLE PWA
   ---------------------------------------------------------
   策略：
   · App Shell（HTML/CSS/JS）→ Cache First，离线可用
   · 图标等静态资源 → Cache First
   · 兜底：离线时返回已缓存的页面
   ========================================================= */

const CACHE_VERSION = 'jwle-v1.0.0';
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png'
];

/* ================= 安装 ================= */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[SW] 缓存 App Shell');
      return cache.addAll(APP_SHELL).catch((err) => {
        console.warn('[SW] 部分资源缓存失败（可忽略）：', err);
      });
    }).then(() => self.skipWaiting())
  );
});

/* ================= 激活 ================= */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => {
          console.log('[SW] 清理旧缓存：', k);
          return caches.delete(k);
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* ================= 请求拦截 ================= */
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // 只处理 GET 请求
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 跨域请求：Network First
  if (url.origin !== self.location.origin) {
    event.respondWith(networkFirst(req));
    return;
  }

  // App Shell & 静态资源：Cache First
  if (
    req.mode === 'navigate' ||
    req.destination === 'document' ||
    req.destination === 'script' ||
    req.destination === 'style' ||
    req.destination === 'image' ||
    req.destination === 'font'
  ) {
    event.respondWith(cacheFirst(req));
    return;
  }

  // 其他：Network First
  event.respondWith(networkFirst(req));
});

/* ================= 策略实现 ================= */

// Cache First：先查缓存，没有再走网络
async function cacheFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(req);
  if (cached) return cached;

  try {
    const res = await fetch(req);
    if (res.ok && (res.type === 'basic' || res.type === 'cors')) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (e) {
    // 离线兜底
    if (req.mode === 'navigate') {
      const fallback = await cache.match('/offline.html');
      if (fallback) return fallback;
      const fb2 = await cache.match('/index.html');
      if (fb2) return fb2;
    }
    throw e;
  }
}

// Network First：先走网络，失败回退缓存
async function networkFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const res = await fetch(req);
    if (res.ok && (res.type === 'basic' || res.type === 'cors')) {
      cache.put(req, res.clone());
    }
    return res;
  } catch (e) {
    const cached = await cache.match(req);
    if (cached) return cached;
    if (req.mode === 'navigate') {
      const fallback = await cache.match('/offline.html');
      if (fallback) return fallback;
      const fb2 = await cache.match('/index.html');
      if (fb2) return fb2;
    }
    throw e;
  }
}
