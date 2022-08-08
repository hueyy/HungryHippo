import Request from '../../Request'
import type { Item } from 'feed'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.pdpc.gov.sg`

const enforcementMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.post(
    `${BASE_URL}/api/pdpcenforcementcases/getenforcementcasestandardlisting`,
    {
      page: 1,
    }
  )

  const items: Item[] = data.items.map(({
    title,
    date,
    url,
    nature,
    decision,
  }) => ({
    content: `<p><strong>Nature of Breach: </strong>${nature}</p>`
      + `<p><strong>Decision: </strong>${decision}</p>`,
    date: new Date(date),
    link: `${BASE_URL}${url}`,
    title
  })) 

  return {
    description: `Latest enforcement decisions made by the PDPC`,
    items,
    link: `${BASE_URL}/Commissions-Decisions`,
    title: `PDPC Enforcement Decisions`
  }
}

export default enforcementMuncher