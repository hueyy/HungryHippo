import Request from "../Request"
import * as cheerio from 'cheerio'
import { IndividualSiteMuncher } from "../types"

const BASE_URL = `https://www.healthprofessionals.gov.sg`
const site = `${BASE_URL}/smc/published-grounds-of-decision`

const smcDTGDMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(site)

  const $ = cheerio.load(data)

  const items = $(`#main-content .sfContentBlock table tbody > tr`).map((index, element) => {
    if(index === 0){
      // ignore because SMC has put the header in tbody for some reason
      return
    }
    return {
      content: $(element).html(),
      date: new Date($(`td`, element).eq(1).text().trim()),
      link: BASE_URL + $(`a`, element).attr(`href`),
      title: $(`a`, element).attr(`title`).trim()
    }
  }).filter(item => typeof item !== `undefined`).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default smcDTGDMuncher