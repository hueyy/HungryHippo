import axios from 'axios'
import cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../types'

const BASE_URL = `https://www.theedgesingapore.com`

const edgeMuncher: IndividualSiteMuncher = async (url) => {
  const { data } = await axios.get(url || `${BASE_URL}/section/latest`)

  const $ = cheerio.load(data)

  const items = $(`.content .node-article`).map((_, element) => ({
    content: $(`.news-desc`, element).text().trim(),
    date: new Date($(`p.article-post-date`, element).text().trim()),
    image: $(`.news-image img`, element).attr(`src`),
    link: BASE_URL + $(`.news-title > a`, element).attr(`href`),
    title: $(`.news-title`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default edgeMuncher