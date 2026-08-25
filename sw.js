// public/sw.js — ADR 0002, D6. Service worker mínim per rebre Web Push.
// Sense build step, JS pla. NO importar res de l'app (aquest fitxer es copia
// tal qual a dist/ per `expo export --platform web`).
//
// No gestiona `pushsubscriptionchange` (D6): el SW no té sessió de Supabase.
// L'app re-registra i fa upsert de la subscripció a cada arrencada.
//
// No fa caché offline (no és una PWA offline, és una PWA per rebre push).

self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(payload.title ?? 'FloVida', {
      body: payload.body ?? '',
      icon: 'icon-192.png',
      badge: 'badge-72.png',
      tag: payload.tag, // col·lapsa duplicats de la mateixa transició
      data: { url: payload.url ?? './' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(event.notification.data.url, self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      const open = list.find((c) => c.url.startsWith(self.registration.scope));
      if (open) return open.focus().then(() => open.navigate(target));
      return self.clients.openWindow(target);
    })
  );
});
