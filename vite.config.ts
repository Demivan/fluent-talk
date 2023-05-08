import { defineConfig } from 'vite'

import { SFCFluentPlugin } from 'unplugin-fluent-vue/vite'

export default defineConfig({
  plugins: [
    SFCFluentPlugin(),
  ]
})
