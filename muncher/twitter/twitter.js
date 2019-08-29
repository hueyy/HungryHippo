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
    const isRetweet = $(`.tweet-content .tweet-social-context`, el).text().indexOf(`retweeted`) > 0
    const isReply = $(`.tweet-content .tweet-reply-context`, el).text().indexOf(`Replying to`) > 0
    let prepend = ``
    if (isRetweet) {
      prepend = `RT: `
    } else if (isReply) {
      prepend = `Reply: `
    }

    const author = {
      link: `https://twitter.com${$(`tr.tweet-header .user-info a`, el).attr(`href`)}`,
      name: $(`tr.tweet-header .user-info .fullname`, el).text(),
    }

    const date = parseTwitterDate($(`.tweet-header .timestamp`, el).text())

    return {
      author: [author],
      content: $(el).html(),
      date,
      link: `https://twitter.com/${handle}/status/${$(`tr.tweet-container .tweet-text`, el).data(`id`)}`,
      title: `${prepend}${$(`tr.tweet-container .tweet-text`, el).text().trim()}`
    }
  }).get()
  return {
    description: accountDescription,
    image: accountProfileImage,
    items: tweets,
    link: `https://twitter.com/${handle}`,
    title: accountName
  }
}

module.exports = twitterMuncher