import Request from '../../Request'
import type { Item } from 'feed'
import { scrapeArticleContent } from '../utils'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.pdpc.gov.sg`

const announcementMuncher: IndividualSiteMuncher = async () => {
  try {
    const { data } = await Request.post(
      `${BASE_URL}/api/pdpcannouncements/getannouncementlisting`,
      {
        page: 1,
        year: `all`,
      }
    )

    const items: Item[] = data.items.map(({
      title,
      date,
      url,
      image
    }) => ({
      date: new Date(date),
      image: `${BASE_URL}${image}`,
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
      description: `Latest announcements by the PDPC`,
      items: itemsWithContent,
      link: `${BASE_URL}/News-and-Events/Announcements`,
      title: `PDPC Announcements`
    }
  } catch (error) {
    console.error(error)
  }
}

export default announcementMuncher