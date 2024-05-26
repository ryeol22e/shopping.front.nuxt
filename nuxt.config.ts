// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default () => {
  const API_BASE_URL: string = `${<string>process.env.NUXT_API_BASE_URL}/api/**`;
  const profile: string = <string>process.env.NUXT_PROFILE_ACTIVE;
  const port: string = <string>process.env.PORT;

  return defineNuxtConfig({
    ssr: true,
    devtools: { enabled: true },
    features: { inlineStyles: false },
    experimental: {
      // localLayerAliases: true,
      sharedPrerenderData: true,
    },
    modules: ['@nuxtjs/device', '@pinia/nuxt', 'nuxt-quasar-ui'],
    // plugins: ['~/plugins/fetch'],
    runtimeConfig: {
      public: {
        baseApiUrl: '/api',
      },
    },
    pinia: {
      storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
    },
    dir: {
      middleware: 'middlewares',
    },
    vue: {
      runtimeCompiler: profile === 'local',
    },
    quasar: {
      plugins: [],
      sassVariables: '~/assets/sass/quasar-variables.sass',
      quietSassWarnings: true,
      config: {},
      cssAddon: true,
      extras: {
        font: null,
        fontIcons: ['material-icons', 'fontawesome-v6', 'mdi-v7'],
        svgIcons: [],
        animations: [],
      },
    },
    css: [],
    logLevel: 'info',
    routeRules: {
      '/': {
        prerender: true,
      },
      '/api/**': {
        ssr: true,
        cors: true,
        proxy: API_BASE_URL,
      },
    },
    app: {
      baseURL: '/',
      rootTag: 'body',
      rootId: 'app',
      head: {
        meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
        title: 'shoppingmall',
        link: [],
        style: [],
        script: [],
        noscript: [],
      },
    },
    components: [
      {
        global: true,
        path: '~/components',
        pathPrefix: false,
      },
    ],
    imports: {
      autoImport: true,
      dirs: [resolve('./stores'), '~/stores', resolve('./composables'), '~/composables', resolve('./components'), '~/components'],
    },
    devServer: {
      https: true,
      port: parseInt(port) || 3000,
    },
    nitro: {
      experimental: {
        websocket: true,
        asyncContext: true,
        legacyExternals: true,
      },
    },
    vite: {
      vue: {
        isProduction: true,
        customElement: false,
      },
      $client: {
        build: {
          emptyOutDir: true,
          assetsDir: 'assets',
          target: 'modules',
          cssTarget: 'chrome61',
          minify: 'esbuild',
          cssMinify: 'esbuild',
          ssr: true,
          rollupOptions: {
            output: {
              entryFileNames: 'assets/[name].js',
              chunkFileNames: 'assets/[hash].js',
              assetFileNames: 'css/[hash].[ext]',
            },
          },
        },
      },
      $server: {
        build: {
          emptyOutDir: true,
        },
      },
    },
    build: {
      analyze: {
        template: 'treemap',
        projectRoot: '/<rootDir>',
        filename: '/<rootDir>/.nuxt/analyze/{name}.html',
      },
    },
  });
};
