import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://iamgoing.co.uk`

const iamgoingMuncher = async () => {
  const resp = await Request.get(BASE_URL)

  const $ = cheerio.load(resp.data)

  const items = $(`.c-card-list > .c-card-list__item`).map((_, element) => ({
    content: $(`.c-card__inner > .c-card__date`, element).text().trim(),
    image: $(`.c-card__image`, element).attr(`style`).match(/url\((.*)\)/)[1],
    link: $(`> a.c-card`, element).attr(`href`),
    title: $(`.c-card__inner > h1`, element).map((__, h) => $(h).text().trim()).get().join(`; `)
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default iamgoingMuncher
