import type { AssembleFeedOptions } from '../../digestor'

export type IndividualSiteMuncher = (url?: string, options?: Record<string, string>) => Promise<AssembleFeedOptions>