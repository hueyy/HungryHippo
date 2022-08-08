import Request from '../../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.law.ox.ac.uk`
const FULL_URL = `${BASE_URL}/events`

const oxfordLawEventsMuncher = async () => {
  const { data } = await Request.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.card-listing > a.event-card`).map((_, element) => {
    const linkPath: string = $(element).attr(`href`)
    return ({
      content: $(element).html(),
      date: new Date($(`p.date`, element).text().trim()),
      link: `${BASE_URL}${linkPath}`,
      title: $(`p.heading-medium`, element).text().trim(),
    })
  }).get().reverse()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default oxfordLawEventsMuncher