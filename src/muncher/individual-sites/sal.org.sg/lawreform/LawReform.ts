import Request from '../../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.sal.org.sg`
const site = `${BASE_URL}/Resources-Tools/Law-Reform/Law-Reform-e-Archive-By-Date`

const lawRefromMuncher = async () => {
  const { data } = await Request.get(site)

  const $ = cheerio.load(data)

  const items = $(`tr.lawreform-row-table`).map((_, element) => ({
    content: $(element).html(),
    link: BASE_URL + $(`a`, element).attr(`href`),
    title: $(`a`, element).text().trim()
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: site,
    title: $(`title`).first().text().trim(),
  }
}

export default lawRefromMuncher