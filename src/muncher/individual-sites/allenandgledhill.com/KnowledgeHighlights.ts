import Request from '../Request'
import { replaceRelativeURLs } from '../../../utils/Helper'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.allenandgledhill.com`
const site = `${BASE_URL}/perspectives/search/?category=2656&searchTerm=`

const agMuncher = async () => {
  const { data } = await Request.get(site)

  const $ = cheerio.load(data)

  const items = $(`.container > .row.row-md-2 > .col-md-6 > article`).map((_, element) => {
    const imagePath = $(`.card-media > picture > img`, element).attr(`src`)
    return {
      content: replaceRelativeURLs($(element).html(), BASE_URL),
      date: new Date($(`.card-body > p.date > span:nth-of-type(2)`, element).text()),
      image: `${BASE_URL}/${imagePath}`,
      link: $(`.card-body > a`, element).attr(`href`),
      title: $(`.card-body > h2.heading`, element).text().trim()
    }
  }).get()

  return {
    description: `Knowledge Highlights from Allen & Gledhill`,
    items,
    link: BASE_URL,
    title: `Allen & Gledhill Knowledge Highlights`,
  }
}

export default agMuncher