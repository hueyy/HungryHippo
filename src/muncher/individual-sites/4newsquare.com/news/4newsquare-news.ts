import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.4newsquare.com`

const newSquareMuncher = async () => {
  const { data } = await axios.get(`${BASE_URL}/news`)

  const $ = cheerio.load(data)

  const items = $(`.news-grid__box > .box__inner > a`).map((_, element) => ({
    content: $(`p`, element).text().trim(),
    date: new Date($(`.teaser__date`).text().trim()),
    image: $(`.teaser__image`, element),
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