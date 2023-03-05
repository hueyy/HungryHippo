import Request from "../Request"
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from "../types"

const BASE_URL = `https://journalsonline.academypublishing.org.sg`
const site = `${BASE_URL}/Journals/SAL-Practitioner/`

const SALPractitionerMuncher: IndividualSiteMuncher = async (_, { area }) => {
  const { data } = await Request.get(`${site}${area}`)
  const $ = cheerio.load(data)

  const items = $(`.ArticleListing tbody > tr`).map((_, element) => ({
    content: $(element).html(),
    date: new Date(
      $(`h4`, element)
        .text().trim()
        .replace(`Published on e-First `, ``)
    ),
    link: $(`a`, element).attr(`href`),
    title: $(`.artListItem > p:nth-of-type(1)`, element).text().trim()
  })).get().filter(item => item.title.length > 0)

  const feedTitle = $(`title`).first().text().trim()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items: items,
    link: site,
    title: `${feedTitle} | SAL Practitioner`
  }
}

export default SALPractitionerMuncher