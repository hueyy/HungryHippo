import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `http://singaporelawblog.sg`

const lawMuncher = async () => {
  const resp = await axios.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`#main ul.posts > li`).map((_, el) => ({
    title: $(`h2.post-title`, el).text().trim(),
    content: $(`.post-desc > p`, el).text().trim(),
    link: $(`.post-meta > a`, el).attr(`href`),
    image: $(`.post-img > a > img`).attr(`src`)
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default lawMuncher