import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://journalsonline.academypublishing.org.sg`
const FULL_URL = `${BASE_URL}/Journals/Singapore-Academy-of-Law-Journal-Special-Issue/Current-Issue`

const annualReviewMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`#dnn_ctr503_View_grdCatDtls > tbody > tr > td`).map((_, el) => ({
    title: $(`.artListItem > p:nth-of-type(1)`, el).text().trim(),
    date: new Date(
      $(`.artListItem > p:nth-of-type(3)`, el)
        .text().trim()
        .replace(`Published on e-First `, ``)
    ),
    content: $(el).html(),
    link: $(`a`, el).attr(`href`)
  })).get()

  return {
    title: $(`title`).text(),
    items,
    link: FULL_URL
  }
}

export default annualReviewMuncher