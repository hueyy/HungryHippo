import Request from '../../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.scca.org.sg/blog`

const SCCABlogMuncher = async () => {
  const { data } = await Request.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`.event_list > .e_listbox`).map((_, element) => ({
    content: $(element).html(),
    image: $(`img`, element).attr(`src`),
    link: $(`h4 a`, element).attr(`href`),
    title: $(`h4`, element).text().trim(),
  })).get()

  return {
    description: `Singapore Corporate Counsel Association Blog`,
    items,
    link: BASE_URL,
    title: `SCCA Blog`
  }
}

export default SCCABlogMuncher