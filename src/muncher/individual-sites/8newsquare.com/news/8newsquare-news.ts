import axios from 'axios'
import cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://8newsquare.co.uk`

const newSquareMuncher: IndividualSiteMuncher = async () => {
  const { data } = await axios.get(`${BASE_URL}/news`)
  const $ = cheerio.load(data)

  const items = $(`#page .entry-content .blocks > .block`).map((_, element) => ({
    content: $(element).html(),
    date: new Date($(`.date`, element).text().trim()),
    link: $(`a`, element).attr(`href`),
    title: $(`.title`, element).text().trim(),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}/news/cases`,
    title: $(`title`).first().text().trim(),
  }
}

export default newSquareMuncher