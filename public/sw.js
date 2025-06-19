/* eslint-disable no-restricted-globals */
/* global clients */

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "Push Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: "/logo192.png",
    badge: "/logo192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
