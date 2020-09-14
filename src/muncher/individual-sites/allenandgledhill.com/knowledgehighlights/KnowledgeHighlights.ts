import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.allenandgledhill.com`
const site = `${BASE_URL}/perspectives/search/?category=2656&searchTerm=`

const agMuncher = async () => {
  const { data } = await axios.get(site)

  const $ = cheerio.load(data)

  const items = $(`.container > .row.row-md-2 > .col-md-6 > article`).map((_, el) => ({
    title: $(`.card-body > h2.heading`, el).text().trim(),
    link: $(`.card-body > a`, el).attr(`href`),
    image: `${BASE_URL}/${$(`.card-media > picture > img`, el).attr(`src`)}`,
    date: new Date($(`.card-body > p.date > span:nth-of-type(2)`, el).text()),
    content: $(el).html()
  })).get()

  return {
    title: `Allen & Gledhill Knowledge Highlights`,
    description: `Knowledge Highlights from Allen & Gledhill`,
    items,
    link: BASE_URL,
  }
}

export default agMuncher