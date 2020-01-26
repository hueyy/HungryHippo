const axios = require(`axios`)
const cheerio = require(`cheerio`)
const dayjs = require(`dayjs`)
const customParseFormat = require(`dayjs/plugin/customParseFormat`)

dayjs.extend(customParseFormat)

const twitterClient = axios.create({
  baseURL: `https://mobile.twitter.com`
})

const parseTwitterDate = (dateString) => {
  const cleanDateString = dateString.trim()
  const isRelativeHour = (
    cleanDateString.length === 2
    || cleanDateString.length === 3
    && cleanDateString.slice(-1) === `h`
  )
  if (isRelativeHour) {
    return dayjs().subtract(
      cleanDateString.slice(0, cleanDateString.length - 1),
      `hours`
    ).toDate()
  }
  const includesYear = cleanDateString.split(` `).length === 3
  if (includesYear) {
    return dayjs(cleanDateString, `MMM D YY`).toDate()
  }
  return dayjs(cleanDateString, `MMM D`).toDate()
}

// https://threadreaderapp.com

const getImage = async (tweetId) => {
  const resp = await twitterClient.get(`/image/status/${tweetId}`)
  const $ = cheerio.load(resp.data)
  const imageURL = $(`.main-tweet .card-photo .media img`).attr(`src`)
  if (imageURL) {
    return imageURL.replace(`:small`, ``)
  }
  // sensitive media
  return null
}

const twitterMuncher = async (handle) => {
  const resp = await twitterClient.get(`/${handle}`)
  const $ = cheerio.load(resp.data)
  const accountName = $(`#main_content .profile .user-info .fullname`).text().trim()
  const accountDescription = $(`#main_content .profile td.details .bio`).text().trim()
  const accountProfileImage = $(`#main_content .profile td.avatar img`).attr(`src`).replace(`normal`, `400x400`)
  const tweets = await Promise.all(
    $(`#main_content .timeline table.tweet`).map(async (i, el) => {
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

      const tweetId = $(`tr.tweet-container .tweet-text`, el).data(`id`)
      const result = {
        author: [author],
        content: $(el).html(),
        date,
        link: `https://twitter.com/${handle}/status/${tweetId}`,
        title: `${prepend}${$(`tr.tweet-container .tweet-text`, el).text().trim()}`
      }

      const hasImage = result.title.indexOf(`pic.twitter.com/`) >= 0
      if (hasImage) {
        result.image = await getImage(tweetId)
        result.content += `<img src=${result.image} />`
      }
      return result
    }).get()
  )

  return {
    description: accountDescription,
    image: accountProfileImage,
    items: tweets,
    link: `https://twitter.com/${handle}`,
    title: accountName
  }
}

module.exports = twitterMuncher