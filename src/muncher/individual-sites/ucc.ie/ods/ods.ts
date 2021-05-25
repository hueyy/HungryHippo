import axios from 'axios'
import cheerio from 'cheerio'
import Logger from '../../../../utils/Logger'

const BASE_URL = `https://www.ucc.ie/academic/law/odg`
const HOME_URL = `${BASE_URL}/home.htm`

const getLatestURL = async () => {
  try {
    const { data } = await axios.get(HOME_URL)

    const $ = cheerio.load(data)

    return `${BASE_URL}/${
      $(`a`)
        .map((_, element) => $(element).attr(`href`)).get()
        .filter(url => url.match(/admin\/\d{4}\.htm/i) !== null)
        .slice(-1)[0]
    }`
  } catch (error) {
    Logger.error(error)
  }
}

const getContent = async ({ link, ...attributes }) => {
  const { data } = await axios.get(link)
  const $ = cheerio.load(data)
  return {
    link,
    ...attributes,
    content: $(`#msg_body`).html(),
  }
}

const odsMuncher = async () => {
  const latestURL = await getLatestURL()
  const { data } = await axios.get(latestURL)

  const $ = cheerio.load(data)

  const items = await Promise.all(
    $(`body > table td > table tr`).slice(1).map((_, element) => ({
      date: new Date(`${$(`td`, element).eq(0).text().trim()} ${latestURL.slice(-8, -4)}`),
      link: `${BASE_URL}/admin/${$(`a`, element).attr(`href`)}`,
      title: $(`a`, element).text().trim()
    })).get().reverse().map((item) => getContent(item))
  )

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: BASE_URL,
    title: $(`title`).first().text().trim(),
  }
}

export default odsMuncher