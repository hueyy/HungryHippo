import axios from 'axios'
import type { Item } from 'feed'
import { scrapeArticleContent } from '../utils'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.pdpc.gov.sg`

const eventsMuncher: IndividualSiteMuncher = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/api/pdpcevents/geteventslisting`,
    {
      page: 1,
      persona: `all`,
      range: `all`,
      type: `all`,
      year: `all`,
    }
  )

  const items: (Item & { privacy: string })[]  = data.items.map(({
      title,
      date,
      url,
      description,
      privacy,
    }) => ({
      date: new Date(date),
      description,
      link: `${BASE_URL}${url}`,
      privacy,
      title,
    })) 

    const contentPromises = await Promise.allSettled(
      items.map(({ link }) => scrapeArticleContent(link))
    )

    const itemsWithContent: Item[] = contentPromises.map(
      (result, index) => {
        const { description, privacy, ...others } = items[index]
        return {
        ...others,
        content: `<p>${description}</p><p>${privacy}</p>${
          result.status === `fulfilled`
            ? result.value
            : ``
          }`,
        }
      }
    )

  return {
    description: `Press releases from the PDPC`,
    items: itemsWithContent,
    link: `${BASE_URL}/News-and-Events/Press-Room`,
    title: `PDPC Press Room`
  }
}

export default eventsMuncher