import Request from '../../Request'

const BASE_URL = `https://www.lawsociety.org.uk`

const newsMuncher = async () => {
  const { data } = await Request.get(`${BASE_URL}/api/search?q=&sortdefinition=date&currentpage=1&pagesize=0&searchPageId=9ff83781-9e87-4393-b032-854f352bb905`)

  const items = data.Data.map(({
    Title,
    ItemUrl,
    TruncatedStandFirst,
    Image
  }) => ({
    content: TruncatedStandFirst,
    link: `${BASE_URL}${ItemUrl}`,
    title: Title,
    ...(Image ? { image: Image.Url } : {})
  }))

  return {
    description: `All news`,
    items,
    link: `${BASE_URL}/all-news`,
    title: `Law Society (UK) News`
  }
}

export default newsMuncher