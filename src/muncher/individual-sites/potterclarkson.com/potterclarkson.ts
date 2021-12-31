import axios from 'axios'
import cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../types'

const BASE_URL = `https://www.potterclarkson.com`

const potterClarkson: IndividualSiteMuncher = async () => {
  const { data } = await axios.get(`${BASE_URL}/insights`)
  const $ = cheerio.load(data)
  const items = $(`#main-content > section #results .card-group > article.card`).map((_, element) => ({
    content: $(`.card__link`, element).html(),
    date: new Date($(`.card__footer time`, element).text().trim()),
    image: BASE_URL.concat($(`.card__media img.card__image`, element).attr(`src`)),
    link: BASE_URL.concat($(`.card__link`, element).attr(`href`)),
    title: $(`.card__header .card__title`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}/insights`,
    title: $(`title`).first().text().trim(),
  }
}

export default potterClarkson