import { type AgnosticRouteObject, matchRoutes } from '@remix-run/router'
import { routes } from 'virtual:remix-flat-routes'

const fallbackLng = 'en'
const defaultNS = ['common']

export const i18nOptions = {
  fallbackLng,
  defaultNS,
  nsSeparator: '.',
  keySeparator: '.',
}

export function resolveNamespace(pathname = window.location.pathname): string[] {
  let r: any[] | null = matchRoutes(routes as AgnosticRouteObject[], pathname)
  if (!r) return defaultNS
  console.log(r)
  r = r.map((route) => route.route.handle)
  console.log(r)
  r = r.filter((t) => t?.i18n)
  console.log(r)
  r = r.map((t) => t.i18n)
  console.log(r)
  r = r.flat()
  console.log(r)
  r = r.concat(defaultNS)
  console.log(r)
  return r
}
