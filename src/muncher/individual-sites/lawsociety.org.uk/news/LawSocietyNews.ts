import axios from 'axios'

const BASE_URL = `https://www.lawsociety.org.uk`

const newsMuncher = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/search?q=&sortdefinition=date&currentpage=1&pagesize=0&searchPageId=9ff83781-9e87-4393-b032-854f352bb905`)

  const items = data.Data.map(({
    Title,
    ItemUrl,
    TruncatedStandFirst,
    Image
  }) => ({
    title: Title,
    link: `${BASE_URL}${ItemUrl}`,
    content: TruncatedStandFirst,
    ...(Image ? { image: Image.Url } : {})
  }))

  return {
    title: `Law Society (UK) News`,
    description: `All news`,
    items,
    link: `${BASE_URL}/all-news`
  }
}

export default newsMuncher