import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'

const baseURL = `https://www.telegraph.co.uk`

const getAbsoluteURL = (relativeURL) => `${baseURL}${relativeURL}`

const TelegraphOpinionMuncher = async (
  url
) => {
  const resp = await axios.get(url)

  const $ = cheerio.load(resp.data)

  const articleList = $(`section.article-list[data-test='article-list-hero']`)[0]

  const items = $(`ul.article-list__list.grid li.article-list__item`, articleList).map((i, el) => {
    const title = $(`h3.list-headline`, el).text().trim()
    const item = {
      author: [
        {
          link: getAbsoluteURL($(`div.card__meta-wrapper span[itemprop='author'] a`, el).attr(`href`)),
          name: $(`div.card__meta-wrapper span[itemprop='author']`, el).text().trim()
        }
      ],
      content: title,
      date: dayjs($(`div.card__meta-wrapper time`, el).attr(`datetime`)).toDate(),
      link: getAbsoluteURL($(`h3.list-headline a.list-headline__link`, el).attr(`href`)),
      title,
      image: null,
    }

    const image = $(`figure.card__figure img.card__image`, el).attr(`src`)
    if (image) {
      item.image = getAbsoluteURL(image.replace(/\?.*$/, ``))
    }
    return item
  }).get()

  console.log(items)

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: url,
    title: $(`title`).first().text().trim(),
  }
}

export default TelegraphOpinionMuncher