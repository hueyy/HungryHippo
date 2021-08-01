import axios from 'axios'
import cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../types'

const BASE_URL = `https://www.rollonfriday.com`

const RollOnFridayMuncher: IndividualSiteMuncher = async () => {
  const resp = await axios.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`#views-bootstrap-main-news-block-1 > .row > .col-xs-12`).map((_, element) => ({
    content: $(`> .views-field-body`).text().trim(),
    date: new Date(),
    image: BASE_URL + $(`> .views-field-field-image img`, element).attr(`src`),
    link: BASE_URL + $(`> .news-title a`, element).attr(`href`),
    title: $(`> .news-title`, element).text().trim(),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default RollOnFridayMuncher