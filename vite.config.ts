import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import {version} from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://skyrimcommands.com/perks'],
        version,
        author: 'Adam Gąsowski',
        homepageURL: 'https://github.com/gander/monkey-skyrimcommands/releases/latest/download/monkey-skyrimcommands.user.js'
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
        metaFileName: true
      },
    }),
  ],
});
