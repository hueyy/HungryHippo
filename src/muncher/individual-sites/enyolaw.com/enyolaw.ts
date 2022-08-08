import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.enyolaw.com`
const FULL_URL = `${BASE_URL}/posts`

const enyoLawMuncher = async () => {
  const { data } = await Request.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.row > .col-sm-6`).map((_, element) => {
    const linkPath = $(`a`, element).eq(0).attr(`href`)
    return ({
      content: $(element).html(),
      date: new Date($(`p.shade-4`, element).text().slice(0, 10).trim()),
      link: `${BASE_URL}${linkPath}`,
      title: $(`h5`, element).text().trim(),
    })
  }).get().reverse()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default enyoLawMuncher