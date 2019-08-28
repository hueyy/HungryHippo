const axios = require(`axios`)
const cheerio = require(`cheerio`)

const twitterClient = axios.create({
  baseURL: `https://mobile.twitter.com`
})

const twitterMuncher = async (handle) => {
  const resp = await twitterClient.get(`/${handle}`)
  const $ = cheerio.load(resp.data)
  const accountName = $(`#main_content .profile .user-info .fullname`).text().trim()
  const accountDescription = $(`#main_content .profile td.details .bio`).text().trim()
  const accountProfileImage = $(`#main_content .profile td.avatar img`).attr(`src`)
  const tweets = $(`#main_content .timeline table.tweet`).map((i, el) => {
    const isRetweet = $(el).find(`.tweet-content .tweet-social-context`).text().indexOf(`retweeted`) > 0
    return {
      title: `${isRetweet ? `RT ` : ``}${$(el).find(`tr.tweet-container .tweet-text`).text().trim()}`,
      link: `https://twitter.com/${handle}/status/${$(el).find(`tr.tweet-container .tweet-text`).data(`id`)}`,
      content: $(el).html()
    }
  }).get()
  return {
    title: accountName,
    description: accountDescription,
    link: `https://twitter.com/${handle}`,
    image: accountProfileImage,
    items: tweets
  }
}

module.exports = twitterMuncher