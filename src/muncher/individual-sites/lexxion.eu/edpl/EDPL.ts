import Request from '../../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://edpl.lexxion.eu`
const FULL_URL = `${BASE_URL}/current_issue/EDPL`

const edplMuncher = async () => {
  const { data } = await Request.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.issue-contents section.article`).map((_, element) => ({
    content: $(element).html(),
    link: BASE_URL + $(`a`, element).attr(`href`),
    title: $(`h2.title`, element).text().trim()
  })).get()

  return {
    items: items.slice(1),
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default edplMuncher