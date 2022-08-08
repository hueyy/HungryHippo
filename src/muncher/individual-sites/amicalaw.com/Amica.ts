import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.amicalaw.com`

const amicaMuncher = async () => {
  const { data } = await Request.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`#comp-j7po4ro3 > ul > li`).map((_, element) => ({
    link: $(`a`, element).attr(`href`),
    title: $(element).text().trim(),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default amicaMuncher