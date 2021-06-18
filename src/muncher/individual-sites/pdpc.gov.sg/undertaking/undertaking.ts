import axios from 'axios'
import cheerio from 'cheerio'
import { scrapeArticleContent } from '../utils'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.pdpc.gov.sg`

const undertakingMuncher: IndividualSiteMuncher = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/Undertakings`
  )

  const $ = cheerio.load(data)

  const items = $(`article.detail-content table > tbody > tr`).map((_, element) => {
    const title = $(`> td:first-of-type`, element).text().trim()
    const link = `${BASE_URL}/${$(`> td:first-of-type a`, element).attr(`href`)}`
    const date = new Date($(`> td:last-of-type`, element).text().trim())
    return {
      date,
      link,
      title,
    }
  }).get()

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
    description: `Undertakings accepted by the PDPC`,
    items: itemsWithContent,
    link: `${BASE_URL}/Undertakings`,
    title: `PDPC Accepted Undertakings`,
  }
  
}

export default undertakingMuncher