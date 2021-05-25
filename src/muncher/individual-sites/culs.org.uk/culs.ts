import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.culs.org.uk`
const FULL_URL = `${BASE_URL}/per-incuriam`

const culsMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.collection-list-2 > .collection-item-8`).map((_, element) => ({
    link: `${BASE_URL}${$(`a.blog2-card-cta`, element).attr(`href`)}`,
    title: $(`h3.card-headline`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default culsMuncher