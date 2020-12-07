import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://edpl.lexxion.eu`
const FULL_URL = `${BASE_URL}/current_issue/EDPL`

const edplMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.issue-contents section.article`).map((_, el) => ({
    title: $(`h2.title`, el).text().trim(),
    content: $(el).html(),
    link: BASE_URL + $(`a`, el).attr(`href`)
  })).get()

  return {
    title: $(`title`).text(),
    items: items.slice(1),
    link: FULL_URL,
  }
}

export default edplMuncher