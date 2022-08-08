import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://thepractice.law.harvard.edu`

const edgeMuncher = async () => {
  const { data } = await Request.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`.articles-index > ul > li`).map((_, element) => ({
    content: $(`p:nth-of-type(2)`, element).text().trim(),
    link: $(`a`, element).attr(`href`),
    title: $(`p:nth-of-type(1)`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default edgeMuncher