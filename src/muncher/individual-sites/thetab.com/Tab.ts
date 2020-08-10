import axios from 'axios'
import cheerio from 'cheerio'

const TheTabMuncher = async (
  url
) => {
  const resp = await axios.get(url)

  const $ = cheerio.load(resp.data)

  const firstStoryEl = $(`.first_article `)
  const items = [
    {
      title: $(`.story__title`, firstStoryEl).text().trim(),
      link: $(`a`, firstStoryEl).attr(`href`),
      image: $(`> a > img`, firstStoryEl).attr(`data-src`),
      author: $(`.story__author > .author-list > a`, firstStoryEl).map((_, el) => ({
        link: $(el).attr(`href`),
        name: $(el).text().trim()
      })).get()
    },
    ...($(`#main-content .feed .story-container > .article__single`).map((_, el) => ({
      title: $(`> h2`, el).text().trim(),
      link: $(`> a`, el).attr(`href`),
      content: $(`> .story__excerpt`, el).text().trim(),
      image: $(`> a > img`, el).attr(`data-src`),
      author: $(`.story__author > .author-list > a`, el).map((_, el) => ({
        link: $(el).attr(`href`),
        name: $(el).text().trim()
      })).get()
    })).get())
  ]

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: url,
  }
}

export default TheTabMuncher