import Request from '../../Request'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.4newsquare.com`

const newSquarePublications: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(`${BASE_URL}/publications`)

  const $ = cheerio.load(data)

  const items = $(`.ajax-container > a`).map((_, element) => ({
    content: $(`p`, element).text().trim(),
    date: new Date($(`.date`).text().slice(1).trim()),
    link: $(element).attr(`href`),
    title: $(`.title`, element).text().trim() + ` - ` + $(`.heading`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}/publications`,
    title: $(`title`).first().text().trim(),
  }
}

export default newSquarePublications