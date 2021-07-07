import type { AssembleFeedOptions } from '../../digestor'

export type IndividualSiteMuncher = (url?: string) => Promise<AssembleFeedOptions>