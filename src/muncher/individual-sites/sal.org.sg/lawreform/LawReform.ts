import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.sal.org.sg`
const site = `${BASE_URL}/Resources-Tools/Law-Reform/Law-Reform-e-Archive-By-Date`

const lawRefromMuncher = async () => {
  const { data } = await axios.get(site)

  const $ = cheerio.load(data)

  const items = $(`tr.lawreform-row-table`).map((_, el) => ({
    title: $(`a`, el).text().trim(),
    link: BASE_URL + $(`a`, el).attr(`href`),
    content: $(el).html()
  })).get()

  return {
    title: $(`title`).first().text().trim(),
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: site,
  }
}

export default lawRefromMuncher