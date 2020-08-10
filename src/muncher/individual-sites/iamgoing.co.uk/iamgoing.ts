import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://iamgoing.co.uk`

const iamgoingMuncher = async () => {
  const resp = await axios.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`.c-card-list > .c-card-list__item`).map((_, el) => ({
    title: $(`.c-card__inner > h1`, el).map((__, h) => $(h).text().trim()).get().join(`; `),
    content: $(`.c-card__inner > .c-card__date`, el).text().trim(),
    image: $(`.c-card__image`, el).attr(`style`).match(/url\((.*)\)/)[1],
    link: $(`> a.c-card`, el).attr(`href`)
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
  }
}

export default iamgoingMuncher
