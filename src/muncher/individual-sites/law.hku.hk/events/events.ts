import axios from 'axios'
import cheerio from 'cheerio'
import Helper from '../../../../utils/Helper'

const BASE_URL = `https://www.law.hku.hk`
const FULL_URL = `${BASE_URL}/events`

const hkuEventsMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.news_box.enews .events_box > .aside_inner_box`).map((_, element) => ({
    content: Helper.cleanup($(`.right_aside`, element).html()),
    link: $(`a.ne_title`, element).attr(`href`),
    title: Helper.cleanup($(`a.ne_title`, element).text().trim()),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default hkuEventsMuncher