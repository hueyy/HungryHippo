import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.scca.org.sg/events`

const SCCAEventsMuncher = async () => {
  const { data } = await axios.get(BASE_URL)

  const $ = cheerio.load(data)

  const items = $(`.event_list > .e_listbox`).map((_, el) => ({
    title: $(`h4`, el).text().trim(),
    content: $(el).html(),
    link: $(`h4 a`, el).attr(`href`),
    image: $(`img`, el).attr(`src`),
  })).get()

  return {
    title: `SCCA Events`,
    description: `Singapore Corporate Counsel Association Events`,
    items,
    link: BASE_URL
  }
}

export default SCCAEventsMuncher