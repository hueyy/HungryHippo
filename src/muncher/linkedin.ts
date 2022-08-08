import axios from 'axios'
import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from './individual-sites/types'

const BASE_URL = `https://www.linkedin.com`

const linkedinClient = axios.create({ baseURL: BASE_URL })

const linkedinMuncher: IndividualSiteMuncher = async path => {
  const resp = await linkedinClient.get(
    path,
    {
      headers: {
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36`
      }
    }
  )

  const $ = cheerio.load(resp.data)

  const name = $(`.top-card-layout__title`).text().trim()
  const jobTitle = $(`.top-card-layout__headline`).text().trim()
  const image = $(`.top-card-layout__card>img`).attr(`src`)
  return {
    description: jobTitle,
    image,
    items: [],
    link: BASE_URL + path,
    title: name,
  }
}

export default linkedinMuncher