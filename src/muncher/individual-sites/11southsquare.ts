import Request from "./Request"
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from './types'

const BASE_URL = `https://www.11southsquare.com/`

const elevenSouthSquareMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(BASE_URL)
  const $ = cheerio.load(data)

  const items = $(`ul.news_list > li`).map((_, element) => {
    return {
      content: $(`div`, element).html(),
      link: BASE_URL,
      title: $(`p.headline`, element).text().trim(),
    }
  }).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default elevenSouthSquareMuncher