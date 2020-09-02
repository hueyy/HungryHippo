import axios from 'axios'
import cheerio from 'cheerio'
import type { CustomAxiosRequestConfig } from '../../../../types/axios'

const URL = `http://law.nus.edu.sg`

const NUSLawNewsMuncher = async () => {
  const req = axios.create({
    insecureHTTPParser: true
  } as CustomAxiosRequestConfig)
  const { data } = await req.get(URL)

  const $ = cheerio.load(data)

  const table = $(`.expandable-box.new > .inner > table`).eq(0)
  const items = $(`tbody > tr`, table).map((_, el) => ({
    title: $(`> td:nth-of-type(2)`, el).text().trim(),
    link: $(`> td:nth-of-type(2) a`, el).attr(`href`),
  })).get()

  return {
    title: `NUS Law News`,
    description: `Latest NUS Law news`,
    items,
    link: URL
  }
}

export default NUSLawNewsMuncher