import Request from './Request'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from './types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const BASE_URL = `https://www.powellgilbert.com`

const powellGilbertMuncher: IndividualSiteMuncher = async () => {
  const link = `${BASE_URL}/news-and-insights/publications`
  const { data } = await Request.get(link)
  const $ = cheerio.load(data)

  const items = $(`article.blog`).map((_, element) => {
    return {
      content: $(element).html(),
      date: dayjs($(`.blog__date`, element).text().trim(), `DD/MM/YYYY HH:mm:ss`).toDate(),
      link: BASE_URL + $(`a`, element).attr(`href`),
      title: $(`.h2.blog__summary-title`, element).text().trim(),
    }
  }).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link,
    title: $(`title`).first().text().trim(),
  }
}

export default powellGilbertMuncher