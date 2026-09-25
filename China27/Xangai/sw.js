// Cache offline: abra uma vez com internet e a página passa a funcionar sem rede.
// Ao publicar uma versão nova, troque o número abaixo (v4 -> v5).
const CACHE = 'xangai-orbitas-v4';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-512.png'];
const PHOTOS = ['capa', 'dia0', 'dia1', 'dia2', 'dia3', 'dia4'].map(n => './img/' + n + '.jpg');
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(CORE);
    await Promise.all(PHOTOS.map(p => c.add(p).catch(() => {}))); // fotos da pasta img/
  }).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Responde do cache na hora e atualiza em segundo plano quando houver rede.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const remote = new URL(e.request.url).origin !== location.origin;
  if (remote && e.request.destination !== 'image') return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(e.request, {ignoreSearch: !remote});
    if (remote && hit) return hit; // foto remota já guardada: não busca de novo
    const net = fetch(e.request).then(r => { if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
