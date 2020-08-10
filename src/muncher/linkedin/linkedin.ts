import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.linkedin.com`

const linkedinClient = axios.create({ baseURL: BASE_URL })

const linkedinMuncher = async path => {
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
    title: name,
    link: BASE_URL + path
  }
}

export default linkedinMuncher