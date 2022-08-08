import Request from '../../Request'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.4newsquare.com`

const newSquareMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(`${BASE_URL}/news`)

  const $ = cheerio.load(data)

  const items = $(`.news-grid__box > .box__inner > a`).map((_, element) => ({
    content: $(element).html(),
    date: new Date($(`.teaser__date`, element).text().trim()),
    image: [...$(`.teaser__image`, element).attr(`style`).matchAll(/background-image: url\('(.*)'\);$/gi)][0][1],
    link: $(element).attr(`href`),
    title: $(`h2`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}/news`,
    title: $(`title`).first().text().trim(),
  }
}

export default newSquareMuncher