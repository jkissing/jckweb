// Kissinger Lab Service Worker: offline cache + dynamic RSS from news.json
const CACHE_NAME = 'kissinger-cache-v1';
const CORE_ASSETS = [
  '/',
  '/people.html',
  '/research.html',
  '/publications.html',
  '/software.html',
  '/news.html',
  '/contact.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/data/people.json',
  '/assets/data/projects.json',
  '/assets/data/publications.json',
  '/assets/data/news.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_ASSETS.filter(Boolean));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

// Helper to generate RSS from news.json
async function buildRSS() {
  try {
    const res = await fetch(new URL('assets/data/news.json', self.registration.scope), { cache: 'no-store' });
    const items = await res.json();
    const site = new URL('./', self.registration.scope).href.replace(/\/$/, '');
    const rssItems = items.sort((a,b)=> new Date(b.date)-new Date(a.date)).map(n => `
      <item>
        <title>${escapeXml(n.title||'')}</title>
        <link>${escapeXml(n.link || new URL('news.html', site).href)}</link>
        <guid isPermaLink="false">${escapeXml(n.id || (n.title+'-'+n.date))}</guid>
        <pubDate>${new Date(n.date).toUTCString()}</pubDate>
        <description>${escapeXml(n.content||'')}</description>
        <category>${escapeXml(n.category||'news')}</category>
      </item>
    `).join('');
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Kissinger Lab News</title>
    <link>${site}</link>
    <description>Updates from the Kissinger Research Group</description>
    <language>en</language>
    ${rssItems}
  </channel>
</rss>`;
    return new Response(rss, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
  } catch (e) {
    return new Response('RSS unavailable', { status: 500 });
  }
}

function escapeXml(str){
  return String(str).replace(/[<>&'\"]/g, s => ({'<':'&lt;','>':'&gt;','&':'&amp;','\'':'&apos;','"':'&quot;'}[s]));
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('/rss.xml')) {
    event.respondWith(buildRSS());
    return;
  }
  // Stale-while-revalidate cache strategy for GET
  if (event.request.method === 'GET' && (url.origin === self.location.origin)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(event.request);
      const networkPromise = fetch(event.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') cache.put(event.request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || networkPromise;
    })());
  }
});
