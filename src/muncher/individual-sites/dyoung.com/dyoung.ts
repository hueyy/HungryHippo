import Request from '../Request'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../types'

const BASE_URL = `https://www.dyoung.com`
const url = `${BASE_URL}/en/knowledgebank/articles`

const dYoungMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(url)
  const $ = cheerio.load(data)

  const items = $(`.c-news-section .c-news-item`).map((_, element) => ({
    content: $(element).html(),
    date: new Date($(`.c-news-item__date`, element).text().trim()),
    link: $(`.c-news-item__link`, element).attr(`href`),
    title: $(`.c-news-item__headline`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: url,
    title: $(`title`).first().text().trim(),
  }
}

export default dYoungMuncher