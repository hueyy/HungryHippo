const axios = require(`axios`)

const UCLNewsMuncher = async (url, { title, description, image, link } = {}) => {
  const resp = await axios.get(url)
  const {
    response: {
      resultPacket: {
        query: scrapedTitle,
        results
      }
    }
  } = resp.data

  const items = results.map(({
    title,
    liveUrl,
    summary,
    metaData: {
      I: itemImage,
      PublishedDate
    }
  }) => {
    return {
      content: summary,
      date: new Date(PublishedDate),
      image: itemImage,
      link: liveUrl,
      title,
    }
  })

  return {
    description,
    image,
    items,
    link: link || url,
    title: title || scrapedTitle
  }
}

module.exports = UCLNewsMuncher