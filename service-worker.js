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
"./adrian-quesada.webp",
"./ahmed-moneka.webp",
"./allison-de-groot-tatiana-hargreaves.webp",
"./bia-ferreira.webp",
"./caamano-and-ameixeiras.webp",
"./catherine-mac-lellan.webp",
"./cecile-doo-kingue.webp",
"./cochemea.webp",
"./corb-lund.webp",
"./daniel-romano-outfit.webp",
"./derek-miller.webp",
"./diyet-and-the-love-soldiers.webp",
"./dug.webp",
"./fish-in-a-birdcage.webp",
"./foxwarren.webp",
"./goldie-boutilier.webp",
"./hermitess.webp",
"./human-interest-with-col-cseke.webp",
"./imglist.txt",
"./jazz-is-dead.webp",
"./jess-williamson.webp",
"./joe-nolan.webp",
"./jontavious-willis.webp",
"./joshua-burnside.webp",
"./julian-taylor.webp",
"./kate-stevens.webp",
"./kazdoura.webp",
"./ken-pomeroy.webp",
"./killabeatmaker.webp",
"./killer-mike.webp",
"./l-t-leif.webp",
"./lacey-hill.webp",
"./lancelot-knight.webp",
"./leaf-rapids.webp",
"./lola-kirk.webp",
"./madalitso-band.webp",
"./madison-cunningham.webp",
"./mariel-buckley.webp",
"./marty-stuart-and-his-fabulous-superlatives.webp",
"./martyn-joseph.webp",
"./maruja-limon.webp",
"./mary-gauthier.webp",
"./mike-stack.webp",
"./mis.webp",
"./mitsune.webp",
"./of-monsters-and-men.webp",
"./ora-cogan.webp",
"./par-de-dos.webp",
"./polo-sho.webp",
"./raleigh.webp",
"./ribbon-skirt.webp",
"./ruby-singh-and-the-future-ancestors.webp",
"./s-g-goodman.webp",
"./sahra-halgan.webp",
"./sam-amidon.webp",
"./shellie-morris-and-kutcha-edwards.webp",
"./superfun.webp",
"./syml.webp",
"./the-east-pointers.webp",
"./the-free-label.webp",
"./the-mbira-renaissance-band.webp",
"./the-neighborhood-kids.webp",
"./the-pairs.webp",
"./thundercat.webp",
"./tiken-jah-fakoly.webp",
"./tribe-artists.webp",
"./valerie-june.webp",
"./yagody.webp"



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
