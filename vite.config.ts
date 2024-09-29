import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { flatRoutes } from 'remix-flat-routes'
import { defineConfig } from 'vite'
import { preset } from 'vite-config-preset'
import { i18nAlly } from 'vite-plugin-i18n-ally'
import { remixFlatRoutes } from 'vite-plugin-remix-flat-routes'
import { vercelPreset } from "@vercel/remix/vite";

installGlobals()

export default defineConfig((env) => {
  const ignoredRouteFiles = ['**/components/**', '**/hooks/**', '**/images/**', '**/utils/**', '**/*.css', '**/meta.*']
  return preset(
    {
      env,
      plugins: [
        i18nAlly(),
        remix({
          routes: async (defineRoutes) => {
            return flatRoutes('routes', defineRoutes, {
              ignoredRouteFiles,
            })
          },
          presets: [vercelPreset()],
        }),
        remixFlatRoutes({
          flatRoutesOptions: {
            ignoredRouteFiles,
          },
        }),
      ],
    },
    {
      react: false,
    },
  )
})
