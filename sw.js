/* Takio Maps - service worker
   Tiene in memoria i file dell'app così si apre anche con poco segnale.
   Le richieste a TomTom (percorsi, traffico, indirizzi) e le tessere della mappa
   passano sempre dalla rete e non vengono mai salvate: gli indirizzi delle API contengono la chiave. */

const VERSIONE = "takio-v2";   // cambia questo numero quando modifichi i file dell'app

const FILE_APP = [
  "./", "index.html", "manifest.webmanifest", "icon.svg",
  "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "apple-touch-icon.png", "favicon-32.png"
];
const LIBRERIE = [
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js",
  "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(VERSIONE);
    await cache.addAll(FILE_APP);
    await Promise.all(LIBRERIE.map(u => cache.add(u).catch(() => {})));  // se falliscono, l'app si installa lo stesso
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const nome of await caches.keys()) if (nome !== VERSIONE) await caches.delete(nome);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const richiesta = e.request;
  if (richiesta.method !== "GET") return;
  const url = new URL(richiesta.url);

  if (url.origin === self.location.origin) {
    // File dell'app: prima la rete (così ricevi gli aggiornamenti), se manca il segnale la copia salvata
    e.respondWith(
      fetch(richiesta, { cache: "no-cache" }).then(risposta => {
        if (risposta.ok) {
          const copia = risposta.clone();
          caches.open(VERSIONE).then(c => c.put(richiesta, copia));
        }
        return risposta;
      }).catch(async () =>
        (await caches.match(richiesta, { ignoreSearch: true })) || (await caches.match("index.html"))
      )
    );
  } else if (LIBRERIE.includes(richiesta.url)) {
    // Libreria della mappa: versione fissa, prima la copia salvata
    e.respondWith(caches.match(richiesta).then(r => r || fetch(richiesta)));
  }
  // Tutto il resto (TomTom, tessere della mappa) non viene toccato
});
