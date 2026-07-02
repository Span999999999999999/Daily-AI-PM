import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Use relative asset paths in the production build so the app works no matter
// what subpath GitHub Pages serves it from (e.g. /<repo-name>/) — renaming the
// repo won't break it. HashRouter keeps client routing working under any path.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Ship a self-destroying service worker: any device that cached the earlier
      // broken build gets the old worker unregistered and its caches cleared, so
      // the app always loads fresh from the network (no stale blank screen).
      selfDestroying: true,
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'AI PM Daily',
        short_name: 'AI PM Daily',
        description: 'Master AI Product Management, one daily mission at a time.',
        theme_color: '#7c6cf0',
        background_color: '#0b0b13',
        display: 'standalone',
        orientation: 'portrait',
        scope: '.',
        start_url: '.',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
}))
