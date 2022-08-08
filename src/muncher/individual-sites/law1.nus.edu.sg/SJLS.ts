import Request from '../Request'
import * as cheerio from 'cheerio'

const BASE_URL = `https://law1.nus.edu.sg/sjls`
const FULL_URL = `${BASE_URL}/archive.asp?strSearchGeneral=&strSearchGeneralOption=2&strSearchTitle=&strSearchTitleOption=2&strSearchAuthor=&strSearchAuthorOption=2&strSearchAbstract=&strSearchAbstractOption=2&intSearchPubMonth=&intSearchPubYear=&strSearchType=bas&intRecordsPerPageOption=50`

const sjlsMuncher = async () => {
  const { data } = await Request.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`#contentcolumn td.content > table > tbody > tr:nth-child(3n)`).map((_, element) => {
    const linkPath = $(`a:last-of-type`, element).attr(`href`)
    return ({
      content: $(`td:nth-of-type(2)`, element).html(),
      link: `${BASE_URL}/${linkPath}}`,
      title: $(`b`, element).text().trim()
    })
  }).get()

  return {
    items,
    link: FULL_URL,
    title: `Singapore Journal of Legal Studies`
  }
}

export default sjlsMuncher