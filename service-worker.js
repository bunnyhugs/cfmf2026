const cacheName = "music-festival-schedule-v1-cfmf2025";
const filesToCache = [
    "./", // Add other URLs that need to be cached here
"./app.js",
"./utils.js",
"./fest-logo.png",
"./bandcamp.png",
"./android-menu.png",
"./android-install.png",
"./safari-share.png",
"./safari-add-to-home-screen.png",
"./apple_splash_1125.png",
"./apple_splash_1242.png",
"./apple_splash_1536.png",
"./apple_splash_1668.png",
"./apple_splash_2048.png",
"./apple_splash_640.png",
"./apple_splash_750.png",
"./artists.json",
"./favicon.png",
"./files.txt",
"./follow-on.png",
"./heard-hover.png",
"./heard.png",
"./icon_x120.png",
"./icon_x152.png",
"./icon_x167.png",
"./icon_x180.png",
"./icon_x57.png",
"./icon_x76.png",
"./index.html",
"./jquery-3.7.0.min.js",
"./jquery.dataTables.min.css",
"./jquery.dataTables.min.js",
"./locations.json",
"./manifest.json",
"./map.jpg",
"./map0.jpg",
"./map1.jpg",
"./map2.jpg",
"./map3.jpg",
"./map5.jpg",
"./map6.jpg",
"./map7.jpg",
"./maskable_icon.png",
"./maskable_icon_x128.png",
"./maskable_icon_x192.png",
"./maskable_icon_x384.png",
"./maskable_icon_x48.png",
"./maskable_icon_x512.png",
"./maskable_icon_x72.png",
"./maskable_icon_x96.png",
"./schedule.json",
"./screenshot.png",
"./service-worker.js",
"./star-hover.png",
"./star-off.png",
"./star-on.png",
"./style.css",
"./unheard.png",
"./img/al-qawha.webp",
"./img/aladean-kheroufi.webp",
"./img/badbadnotgood.webp",
"./img/begonia.webp",
"./img/bel-and-quinn.webp",
"./img/billie-zizi.webp",
"./img/blue-moon-marquee.webp",
"./img/bria-salmena.webp",
"./img/cake.webp",
"./img/caracol.webp",
"./img/cedric-lightning.webp",
"./img/chris-pierce.webp",
"./img/christopher-gamble.webp",
"./img/cymande.webp",
"./img/daby-toure.webp",
"./img/dengue-fever.webp",
"./img/digging-roots.webp",
"./img/el-balcon.webp",
"./img/elisapie.webp",
"./img/eliza-mary-doyle.webp",
"./img/emily-wurramara.webp",
"./img/empanadas-ilegales.webp",
"./img/fruition.webp",
"./img/human-interest-with-col-cseke.webp",
"./img/jairus-sharif.webp",
"./img/jake-vaadeland.webp",
"./img/jennifer-castle.webp",
"./img/jolie-laide.webp",
"./img/jon-mckiel.webp",
"./img/katie-tupper.webp",
"./img/katy-kirby.webp",
"./img/la-lom.webp",
"./img/laura-hickli.webp",
"./img/les-mamans-du-congo-x-rrobin.webp",
"./img/list.txt",
"./img/los-lobos.webp",
"./img/madeleine-peyroux.webp",
"./img/maia-davies.webp",
"./img/medusa.webp",
"./img/michael-kiwanuka.webp",
"./img/montuno-west.webp",
"./img/moontricks.webp",
"./img/nick-shoulders.webp",
"./img/ocie-elliott.webp",
"./img/olive-klug.webp",
"./img/pahua.webp",
"./img/patrick-watson.webp",
"./img/ruby-waters.webp",
"./img/shaina-hayes.webp",
"./img/sierra-ferrell.webp",
"./img/skinny-dyck.webp",
"./img/st-arnaud.webp",
"./img/starpainter.webp",
"./img/steve-dawson-and-the-hooded-mergansers.webp",
"./img/steve-earle-and-reckless-kelly.webp",
"./img/susan-o-neill.webp",
"./img/tall-tall-trees.webp",
"./img/tamar-ilana-and-ventanas.webp",
"./img/the-dust-collectors.webp",
"./img/the-hearts.webp",
"./img/the-heavy-heavy.webp",
"./img/the-langan-band.webp",
"./img/tim-williams.webp",
"./img/tinge.webp",
"./img/tribe-artist-society.webp",
"./img/viik.webp",
"./img/willi-carlisle.webp",
"./img/yasmin-williams.webp"


];

/*
async function delayCacheAddAll(cache, urls, delay) {
  await new Promise(resolve => setTimeout(resolve, delay));
  await cache.addAll(urls);
}

const delayMilliseconds = 2000; // 2 seconds

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => delayCacheAddAll(cache, urlsToAdd, delayMilliseconds))
			.then(() => {
				console.log('Cache.addAll() with delay completed successfully.');
			})
            .catch(error => {
                console.error("Caching failed:", error);
            })
    );
});
*/

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
            .catch(error => {
                console.error("Caching failed:", error);
            })
    );
});

self.addEventListener("activate", (e) => {
console.log("activate");
      e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        }),
      );
    }),
  );
});

self.addEventListener("fetch", event => {
console.log("fetch");
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(error => {
                console.error("Error fetching from cache:", error);
            })
    );
});
