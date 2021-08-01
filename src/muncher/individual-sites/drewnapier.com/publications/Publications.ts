import axios from 'axios'
import cheerio from 'cheerio'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.drewnapier.com`
const site = `${BASE_URL}/Publications?monthfrom=0&yearfrom=1&monthto=12&yearto=9998&type=`

const lawRefromMuncher: IndividualSiteMuncher = async (_, {
  practice = ``
} = { practice: `` }) => {
  const { data } = await axios.get(`${site}&practice=${practice}`)

  const $ = cheerio.load(data)

  const items = $(`ul.resource-list > li.resource-item`).map((_, element) => {
    const href = $(`h3 > a`, element).attr(`href`)
    return ({
      content: $(element).html(),
      date: new Date(),
      link: `${BASE_URL}/${href}`,
      title: $(`h3`, element).text().trim(),
    })
  }).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default lawRefromMuncher