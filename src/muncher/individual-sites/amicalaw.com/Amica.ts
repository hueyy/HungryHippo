import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.amicalaw.com`

const amicaMuncher = async () => {
  const { data } = await axios.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`#comp-j7po4ro3 > ul > li`).map((_, el) => ({
    title: $(el).text().trim(),
    link: $(`a`, el).attr(`href`),
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default amicaMuncher