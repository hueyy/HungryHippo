import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://thepractice.law.harvard.edu`

const edgeMuncher = async () => {
  const { data } = await axios.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`.articles-index > ul > li`).map((_, el) => ({
    title: $(`p:nth-of-type(1)`, el).text().trim(),
    content: $(`p:nth-of-type(2)`, el).text().trim(),
    link: $(`a`, el).attr(`href`)
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default edgeMuncher