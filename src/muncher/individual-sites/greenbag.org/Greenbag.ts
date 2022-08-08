import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `http://greenbag.org`
const FULL_URL = `${BASE_URL}/archive/green_bag_tables_of_contents.html`

const greenbagMuncher = async () => {
  const { data } = await Request.get(FULL_URL)

  const $ = cheerio.load(data)

  $(`#mainContent > h1`).each((_, element) => {
    $(element).nextUntil(`h1`).addBack().wrapAll(`<div class="item" />`)
  }).get()

  const items = $(`#mainContent .item`).map((_, element) => ({
    content: $(element).html(),
    link: FULL_URL,
    title: $(`h1`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default greenbagMuncher