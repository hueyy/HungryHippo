const axios = require(`axios`)
const cheerio = require(`cheerio`)
const dayjs = require(`dayjs`)
const customParseFormat = require(`dayjs/plugin/customParseFormat`)

dayjs.extend(customParseFormat)

const twitterClient = axios.create({
  baseURL: `https://mobile.twitter.com`
})

const parseTwitterDate = (dateString) => {
  if (dateString.split(` `).length === 3) {
    return dayjs(dateString, `MMM D YY`).toDate()
  }
  return dayjs(dateString, `MMM D`).toDate()
}

const twitterMuncher = async (handle) => {
  const resp = await twitterClient.get(`/${handle}`)
  const $ = cheerio.load(resp.data)
  const accountName = $(`#main_content .profile .user-info .fullname`).text().trim()
  const accountDescription = $(`#main_content .profile td.details .bio`).text().trim()
  const accountProfileImage = $(`#main_content .profile td.avatar img`).attr(`src`).replace(`normal`, `400x400`)
  const tweets = $(`#main_content .timeline table.tweet`).map((i, el) => {
    const isRetweet = $(el).find(`.tweet-content .tweet-social-context`).text().indexOf(`retweeted`) > 0
    const isReply = $(el).find(`.tweet-content .tweet-reply-context`).text().indexOf(`Replying to`) > 0
    let prepend = ``
    if (isRetweet) {
      prepend = `RT: `
    } else if (isReply) {
      prepend = `Reply: `
    }

    const author = {
      name: $(el).find(`tr.tweet-header .user-info .fullname`).text(),
      link: `https://twitter.com${$(el).find(`tr.tweet-header .user-info a`).attr(`href`)}`,
    }

    const date = parseTwitterDate($(el).find(`.tweet-header .timestamp`).text())

    return {
      title: `${prepend}${$(el).find(`tr.tweet-container .tweet-text`).text().trim()}`,
      link: `https://twitter.com/${handle}/status/${$(el).find(`tr.tweet-container .tweet-text`).data(`id`)}`,
      content: $(el).html(),
      author: [author],
      date
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