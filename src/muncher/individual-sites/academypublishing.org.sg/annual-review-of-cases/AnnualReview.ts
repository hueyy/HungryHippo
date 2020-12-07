import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://journalsonline.academypublishing.org.sg`
const FULL_URL = `${BASE_URL}/E-First/Singapore-Academy-of-Law-Annual-Review-of-Singapore-Cases`

const annualReviewMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`#dnn_ctr570_View_grdeFirstDtls > tbody > tr > td`).map((_, el) => ({
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
    items: items.slice(0, -1),
    link: FULL_URL
  }
}

export default annualReviewMuncher