import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.pagewhite.com`
const FULL_URL = `${BASE_URL}/information-hub`

const pageWhiteMuncher = async () => {
  const { data } = await Request.get(FULL_URL)

  const $ = cheerio.load(data)

  const items = $(`.output-wrapper .inner .item-wrapper > .item.item-news`).map((_, element) => ({
    content: $(`p`, element).text().trim(),
    date: new Date($(`.date`, element).text().trim()),
    image: $(`img`, element).attr(`src`),
    link: $(`a.title`, element).attr(`href`),
    title: $(`a.title`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default pageWhiteMuncher