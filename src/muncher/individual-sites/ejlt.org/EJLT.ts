import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `http://ejlt.org`
const FULL_URL = `${BASE_URL}/index.php/ejlt/index`

const ejltMuncher = async () => {
  const { data } = await axios.get(FULL_URL)
  const $ = cheerio.load(data)

  const items = $(`.page_index_journal .obj_article_summary`).map((_, element) => ({
    content: $(element).html(),
    link: $(`a.obj_galley_link.file`).attr(`href`),
    title: $(`.title`, element).text().trim()
  })).get()

  return {
    items,
    link: FULL_URL,
    title: $(`title`).text(),
  }
}

export default ejltMuncher