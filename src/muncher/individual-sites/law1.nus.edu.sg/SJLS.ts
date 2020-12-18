import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://law1.nus.edu.sg/sjls`
const FULL_URL = `${BASE_URL}/archive.asp?strSearchGeneral=&strSearchGeneralOption=2&strSearchTitle=&strSearchTitleOption=2&strSearchAuthor=&strSearchAuthorOption=2&strSearchAbstract=&strSearchAbstractOption=2&intSearchPubMonth=&intSearchPubYear=&strSearchType=bas&intRecordsPerPageOption=50`

const sjlsMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`#contentcolumn td.content > table > tbody > tr:nth-child(3n)`).map((_, el) => ({
    title: $(`b`, el).text().trim(),
    content: $(`td:nth-of-type(2)`, el).html(),
    link: `${BASE_URL}/${$(`a:last-of-type`, el).attr(`href`)}`
  })).get()

  return {
    title: `Singapore Journal of Legal Studies`,
    items,
    link: FULL_URL
  }
}

export default sjlsMuncher