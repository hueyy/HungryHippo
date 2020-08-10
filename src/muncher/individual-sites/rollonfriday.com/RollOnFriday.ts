import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.rollonfriday.com`

const RollOnFridayMuncher = async () => {
  const resp = await axios.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`#views-bootstrap-main-news-block-1 > .row > .col-xs-12`).map((_, el) => ({
    title: $(`> .news-title`, el).text().trim(),
    link: BASE_URL + $(`> .news-title a`, el).attr(`href`),
    image: BASE_URL + $(`> .views-field-field-image img`, el).attr(`src`),
    content: $(`> .views-field-body`).text().trim()
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default RollOnFridayMuncher