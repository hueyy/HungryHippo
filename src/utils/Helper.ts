import crypto from 'crypto'

export const cleanup = (string: string): string => string.replace(/[^\d !"#$%&()-_`a-z{|}~]*/g, ``)

export const hash = (inputString: string): string => crypto.createHash(`sha256`).update(inputString).digest(`hex`)

export const replaceRelativeURLs = (html: string, baseURL: string) => html
  .replaceAll(`href="/`, `href="${baseURL}/`)
  .replaceAll(`srcset="/`, `srcset="${baseURL}/`)
  .replaceAll(`src="/`, `src="${baseURL}/`)