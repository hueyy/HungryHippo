import Request from '../../Request'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://nianticlabs.com`

const nianticLabsMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(`${BASE_URL}/blog`)
  const $ = cheerio.load(data)

  const items = $(`.blog-list article.blog-post`).map((_, element) => ({
    content: $(element).html(),
    date: new Date($(`.blog-post__eyebrow`, element).text().trim()),
    link: BASE_URL.concat($(`a.blog-post__title`, element).attr(`href`)),
    title: $(`.blog-post__title`, element).text().trim(),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: `${BASE_URL}/blog`,
    title: $(`title`).first().text().trim(),
  }
}

export default nianticLabsMuncher
