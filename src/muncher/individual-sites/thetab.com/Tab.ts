import axios from 'axios'
import cheerio from 'cheerio'

const TheTabMuncher = async (
  url
) => {
  const resp = await axios.get(url)

  const $ = cheerio.load(resp.data)

  const firstStoryElement = $(`.first_article `)
  const items = [
    {
      author: $(`.story__author > .author-list > a`, firstStoryElement).map((_, element) => ({
        link: $(element).attr(`href`),
        name: $(element).text().trim()
      })).get(),
      image: $(`> a > img`, firstStoryElement).attr(`data-src`),
      link: $(`a`, firstStoryElement).attr(`href`),
      title: $(`.story__title`, firstStoryElement).text().trim()
    },
    ...($(`#main-content .feed .story-container > .article__single`).map((_, element) => ({
      author: $(`.story__author > .author-list > a`, element).map((_, element) => ({
        link: $(element).attr(`href`),
        name: $(element).text().trim()
      })).get(),
      content: $(`> .story__excerpt`, element).text().trim(),
      image: $(`> a > img`, element).attr(`data-src`),
      link: $(`> a`, element).attr(`href`),
      title: $(`> h2`, element).text().trim()
    })).get())
  ]

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: url,
    title: $(`title`).first().text().trim(),
  }
}

export default TheTabMuncher