import { defineAppSetup } from '@slidev/types'

import { createFluentVue } from 'fluent-vue'
import { FluentBundle } from '@fluent/bundle'

export default defineAppSetup(({ app, router }) => {
  const fluent = createFluentVue({
    bundles: [
      new FluentBundle('en')
    ]
  })

  app.use(fluent)
})
