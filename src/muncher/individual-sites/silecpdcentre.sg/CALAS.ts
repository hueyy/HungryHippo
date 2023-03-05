import Request from "../Request"
import * as cheerio from 'cheerio'

const BASE_URL = `https://www.silecpdcentre.sg`
const CALAS_URL = `${BASE_URL}/calas/`

const CALAS = async () => {
  const { data } = await Request.get(CALAS_URL)
  const $ = cheerio.load(data)

  const items = $(`.CallistView > dl > dt`).slice(1).map((_, element) => {
    const date = $(element).text().trim()
    const dd = $(element).next()

    return {
      content: date,
      link: BASE_URL + $(`a`, dd).attr(`href`),
      title: $(dd).text().trim()
    }
  }).get()

  return {
    description: `Calendar of Accredited Learning Activities (CALAS)`,
    items,
    link: CALAS_URL,
    title: `SILE CPD Events`
  }
}

export default CALAS