# `public/` — assets estàtics de l'exportació web (ADR 0002, D6)

Aquesta carpeta es copia tal qual a `dist/` per `expo export --platform web`.

- `manifest.json` — Web App Manifest (`display: standalone`, imprescindible per al push a iOS).
- `sw.js` — service worker mínim (`push` + `notificationclick`). Sense build step.
- `icon-192.png`, `icon-512.png`, `badge-72.png` — **placeholder**: redimensionats
  automàticament de `assets/icon.png` (1024×1024) amb `sharp`, sense retocs de disseny.
  Revisar amb disseny abans de publicar-los com a definitius (marge/padding per a
  `maskable`, contrast del `badge` a la barra d'estat, etc.).
