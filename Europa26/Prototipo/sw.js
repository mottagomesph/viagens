// Uso offline: abra a página uma vez com internet e ela passa a funcionar sem rede.
// Toda nova publicação troca o número do cache (campo "cache" da ficha da cidade).
const CACHE = 'europa26-prototipo-v7';
const PREFIXO = 'europa26-prototipo-';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-180.png', './icon-512.png'];
const FOTOS = ["./img/capa.jpg", "./img/dia0.jpg", "./img/dia1.jpg", "./img/dia2.jpg", "./img/dia3.jpg", "./img/dia4.jpg"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(CORE);
    await Promise.all(FOTOS.map(f => c.add(f).catch(() => {})));
  }).then(() => self.skipWaiting()));
});
// Apaga só versões antigas desta cidade: o domínio é compartilhado com outros sites.
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIXO) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Responde do cache na hora e atualiza em segundo plano; nunca guarda outros domínios.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const rede = fetch(req).then(r => {
    if (r.ok) { const copia = r.clone(); e.waitUntil(caches.open(CACHE).then(c => c.put(req, copia))); }
    return r;
  });
  e.waitUntil(rede.then(() => {}, () => {}));
  e.respondWith(caches.open(CACHE).then(c => c.match(req, {ignoreSearch: true})).then(hit => hit || rede));
});
