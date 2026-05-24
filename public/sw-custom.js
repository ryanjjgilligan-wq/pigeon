// Custom service worker additions
// next-pwa generates the main SW; this file is for custom logic

self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Forage";
  const options = {
    body: data.body || "Time to forage for something great!",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    vibrate: [100, 50, 100],
    data: { url: data.url || "/" },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
