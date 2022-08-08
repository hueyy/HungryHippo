import Request from '../../Request'
import type { Item } from 'feed'
import { scrapeArticleContent } from '../utils'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.pdpc.gov.sg`

const pressroomMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.post(
    `${BASE_URL}/api/pdpcpressroom/getpressroomlisting`,
    {
      page: 1,
      type: `all`,
      year: `all`,
    }
  )

  const items: Item[] = data.items.map(({
      title,
      date,
      url,
    }) => ({
      date: new Date(date),
      link: `${BASE_URL}${url}`,
      title,
    })) 

    const contentPromises = await Promise.allSettled(
      items.map(({ link }) => scrapeArticleContent(link))
    )

    const itemsWithContent = contentPromises.map(
      (result, index) => ({
        ...items[index],
        ...(result.status === `fulfilled` ? { content: result.value } : {}),
      })
    )

  return {
    description: `Press releases from the PDPC`,
    items: itemsWithContent,
    link: `${BASE_URL}/News-and-Events/Press-Room`,
    title: `PDPC Press Room`
  }
}

export default pressroomMuncher