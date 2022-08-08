import axios from 'axios'
import * as cheerio from 'cheerio'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { setupCache } from 'axios-cache-interceptor'
import fileStorage from '../utils/FileStorage'

dayjs.extend(customParseFormat)

const twitterClient = setupCache(
  axios.create({
    baseURL: `https://mobile.twitter.com`
  }),
  {
    interpretHeader: false,
    storage: fileStorage,
    ttl: 12 * 60 * 60 * 1000, // 12 hours
  }
)

const parseTwitterDate = (dateString) => {
  const cleanDateString = dateString.trim()
  const isRelativeHour = (
    cleanDateString.length === 2
    || cleanDateString.length === 3
    && cleanDateString.slice(-1) === `h`
  )
  if (isRelativeHour) {
    return dayjs().subtract(
      cleanDateString.slice(0, - 1),
      `hour`
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
}

const twitterMuncher = async (handle) => {
  const resp = await twitterClient.get(`/${handle}`)
  const $ = cheerio.load(resp.data)
  const accountName = $(`#main_content .profile .user-info .fullname`).text().trim()
  const accountDescription = $(`#main_content .profile td.details .bio`).text().trim()
  const accountProfileImage = $(`#main_content .profile td.avatar img`).attr(`src`).replace(`normal`, `400x400`)
  const tweets = await Promise.all(
    $(`#main_content .timeline table.tweet`).map(async (index, element) => {
      const isRetweet = $(`.tweet-content .tweet-social-context`, element).text().indexOf(`retweeted`) > 0
      const isReply = $(`.tweet-content .tweet-reply-context`, element).text().indexOf(`Replying to`) > 0
      let prepend = ``
      if (isRetweet) {
        prepend = `RT: `
      } else if (isReply) {
        prepend = `Reply: `
      }

      const authorPath = $(`tr.tweet-header .user-info a`, element).attr(`href`)
      const author = {
        link: `https://twitter.com${authorPath}`,
        name: $(`tr.tweet-header .user-info .fullname`, element).text(),
      }

      const date = parseTwitterDate($(`.tweet-header .timestamp`, element).text())

      const tweetId = $(`tr.tweet-container .tweet-text`, element).data(`id`)
      const tweetContent = $(`tr.tweet-container .tweet-text`, element).text().trim()
      const result = {
        author: [author],
        content: $(element).html(),
        date,
        image: undefined,
        link: `https://twitter.com/${handle}/status/${tweetId}`,
        title: `${prepend}${tweetContent}`,
      }

      const hasImage = result.title.includes(`pic.twitter.com/`)
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

export default twitterMuncher