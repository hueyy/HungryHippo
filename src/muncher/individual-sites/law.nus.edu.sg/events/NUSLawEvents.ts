import axios from 'axios'
import cheerio from 'cheerio'
import type { CustomAxiosRequestConfig } from '../../../../types/axios'

const URL = `http://law.nus.edu.sg`

const NUSLawEvents = async () => {
  const req = axios.create({
    insecureHTTPParser: true
  } as CustomAxiosRequestConfig)
  const { data } = await req.get(URL)

  const $ = cheerio.load(data)

  const table = $(`.expandable-box.new > .inner > table`).eq(1)
  const items = $(`tbody > tr`, table)
    .filter((_, el) => $(el).text().trim().length > 0)
    .map((_, el) => ({
      title: $(`> td a`, el).text().trim(),
      link: $(`> td a`, el).attr(`href`),
      content: $(`> td`, el).text().trim()
    }))
    .get()

  return {
    title: `NUS Law Events`,
    description: `Latest NUS Law events`,
    items,
    link: URL
  }
}

export default NUSLawEvents