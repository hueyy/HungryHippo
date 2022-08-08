import Request from '../Request'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'

const baseURL = `https://www.telegraph.co.uk`

const getAbsoluteURL = (relativeURL) => `${baseURL}${relativeURL}`

const TelegraphOpinionMuncher = async (
  url
) => {
  const resp = await Request.get(url)

  const $ = cheerio.load(resp.data)

  const articleList = $(`section.article-list[data-test='article-list-hero']`)[0]

  const items = $(`ul.article-list__list.grid li.article-list__item`, articleList).map((index, element) => {
    const title = $(`h3.list-headline`, element).text().trim()
    const item = {
      author: [
        {
          link: getAbsoluteURL($(`div.card__meta-wrapper span[itemprop='author'] a`, element).attr(`href`)),
          name: $(`div.card__meta-wrapper span[itemprop='author']`, element).text().trim()
        }
      ],
      content: title,
      date: dayjs($(`div.card__meta-wrapper time`, element).attr(`datetime`)).toDate(),
      image: undefined,
      link: getAbsoluteURL($(`h3.list-headline a.list-headline__link`, element).attr(`href`)),
      title,
    }

    const image = $(`figure.card__figure img.card__image`, element).attr(`src`)
    if (image) {
      item.image = getAbsoluteURL(image.replace(/\?.*$/, ``))
    }
    return item
  }).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: url,
    title: $(`title`).first().text().trim(),
  }
}

export default TelegraphOpinionMuncher