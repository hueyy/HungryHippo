import crypto from 'crypto'

export const cleanup = (string: string): string => string.replace(/[^\d !"#$%&()-_`a-z{|}~]*/g, ``)

export const hash = (inputString: string): string => crypto.createHash(`sha256`).update(inputString).digest(`hex`)
