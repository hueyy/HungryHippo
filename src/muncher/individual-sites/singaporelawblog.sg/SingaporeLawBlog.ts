import axios from 'axios'
import * as cheerio from 'cheerio'

const BASE_URL = `http://singaporelawblog.sg`

const lawMuncher = async () => {
  const resp = await axios.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`#main ul.posts > li`).map((_, element) => ({
    content: $(`.post-desc > p`, element).text().trim(),
    image: $(`.post-img > a > img`).attr(`src`),
    link: $(`.post-meta > a`, element).attr(`href`),
    title: $(`h2.post-title`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default lawMuncher