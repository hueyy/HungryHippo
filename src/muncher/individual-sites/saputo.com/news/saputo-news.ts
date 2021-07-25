import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `http://newsroom.saputo.com/`

const newSaputoMuncher = async () => {
  const { data } = await axios.get(`${BASE_URL}`)

  const $ = cheerio.load(data)
  console.warn($.html(`.result > .inner `))
  const items = $(`.result > .inner `).map((_, element) => ({
    date: new Date($(`.sub-head`,element).text().trim()),
    description: $(`p`, element).text().trim(),
    image: $(`img`, element).attr(`src`),
    link: $(`a`, element).attr(`href`),
    title: $(`a`, element).text().trim(),
  })).get()
  console.warn(items)

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}`,
    title: $(`title`).first().text().trim(),
  }
}

export default newSaputoMuncher