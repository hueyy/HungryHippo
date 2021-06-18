import axios from 'axios'
import cheerio from 'cheerio'

const BASE_URL = `https://www.pdpc.gov.sg`

export const scrapeArticleContent = async (link: string): Promise<string> => {
  try {
    const { data } = await axios.get(link)
    const $ = cheerio.load(data)
    const content = $(`article.detail-content`)
    $(`a`, content).each((_, element) => {
      const href = $(element).attr(`href`)
      if(href && href.slice(0, 1) === `/`){
        $(element).attr(`href`, `${BASE_URL}${href}`)
      }
    })
    $(`img`, content).each((_, element) => {
      const source = $(element).attr(`src`)
      if(source && source.slice(0, 1) === `/`){
        $(element).attr(`src`, `${BASE_URL}${source}`)
      }
    })
    return content.html()
  } catch (error){
    console.error(error)
  }
}