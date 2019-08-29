const axios = require(`axios`)
const cheerio = require(`cheerio`)
const dayjs = require(`dayjs`)
const customParseFormat = require(`dayjs/plugin/customParseFormat`)

dayjs.extend(customParseFormat)

const facebookClient = axios.create({
  baseURL: `https://mobile.facebook.com`
})

const parseFacebookDate = (dateString) => {
  if (dateString.split(` `).length === 5) {
    return dayjs(dateString, `D MMMM YYYY [at] HH:mm`).toDate()
  }
  return dayjs(dateString, `D MMMM [at] HH:mm`).toDate()
}

const facebookMuncher = async username => {
  const resp = await facebookClient.get(`/${username}`)
  const $ = cheerio.load(resp.data)

  const name = $(`#u_0_5`).text().trim()
  const description = $(`meta[property="og:description"]`).attr(`content`)
  const image = $(`meta[property="og:image"]`).attr(`content`)

  const items = $(`#recent>div>div>div`).map((i, el) => {
    return {
      content: $(el).html(),
      date: parseFacebookDate($(`div:nth-of-type(2)>div:first-of-type>abbr`, el).text().trim()),
      link: `https://facebook.com${$(`div:nth-of-type(2)>div:nth-of-type(2)>a:last-of-type`).attr(`href`)}`,
      title: $(`div:first-of-type>div:nth-of-type(2)>span>p`, el).map((pIndex, p) => $(p).text().trim()).get().join(`\n`)
    }
  }).get()

  return {
    description,
    image,
    items,
    link: `https://facebook.com/${username}`,
    title: name
  }
}

module.exports = facebookMuncher