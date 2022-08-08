import Request from '../../Request'
import * as cheerio from 'cheerio'
import { cleanup } from '../../../../utils/Helper'
import type { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.law.hku.hk`
const FULL_URL = `${BASE_URL}/events`

const hkuEventsMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.news_box.enews .events_box > .aside_inner_box`).map((_, element) => ({
    content: cleanup($(`.right_aside`, element).html()),
    link: $(`a.ne_title`, element).attr(`href`),
    title: cleanup($(`a.ne_title`, element).text().trim()),
  })).get()

  return {
    description: $(`meta[property='og:description']`).text().trim(),
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default hkuEventsMuncher