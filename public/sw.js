/* eslint-disable no-restricted-globals */
/* global clients */

self.addEventListener("push", (event) => {
  if (!event.data) return;

  const data = event.data.json();

  const title = data.title || "Push Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: data?.icon || "/logo192.png",
    badge: data?.badge || "/logo192.png",
    data: {
      url: data.url || "/",
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen = event.notification?.data?.url;

  // Fallback to root if no URL is provided
  const fallbackUrl = "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const isInternal =
          urlToOpen?.startsWith("/") ||
          urlToOpen?.startsWith(self.location.origin);
        const targetUrl = urlToOpen || fallbackUrl;

        // If internal URL, try to focus an open tab
        if (isInternal) {
          for (const client of clientList) {
            if (client.url.includes(targetUrl) && "focus" in client) {
              return client.focus();
            }
          }
        }

        // Always open a new window if no match found or it's an external link
        return clients.openWindow(targetUrl);
      })
  );
});
