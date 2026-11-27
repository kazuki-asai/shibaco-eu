import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import prerender from '@prerenderer/rollup-plugin'
import { fileURLToPath, URL } from 'node:url'

const PRERENDER_ROUTES = [
  '/',
  '/brand-story',
  '/shipping',
  '/returns',
  '/faq',
  '/privacy-policy',
  '/legal',
  '/contact',
  '/products',
]

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://host.docker.internal:3001'

  return {
  plugins: [
    vue(),
    prerender({
      routes: PRERENDER_ROUTES,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'prerender-ready',
        headless: true,
      },
      server: {
        proxy: {
          '/api': {
            target: proxyTarget,
            changeOrigin: true,
          },
        },
      },
      postProcess(renderedRoute) {
        renderedRoute.route = renderedRoute.originalRoute
        if (renderedRoute.html) {
          renderedRoute.html = renderedRoute.html.replace(
            /https?:\/\/(?:127\.0\.0\.1|localhost|host\.docker\.internal)(?::\d+)?/gi,
            '',
          )
        }
        return renderedRoute
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(',') : [],
    proxy: {
      '/api': {
        target: proxyTarget,
        changeOrigin: true,
      },
      '/rails': {
        target: proxyTarget,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            const location = proxyRes.headers['location']
            if (location) {
              proxyRes.headers['location'] = location.replace(/^https?:\/\/(localhost|host\.docker\.internal):\d+/, '')
            }
          })
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'],
      },
    },
  },
  }
})
