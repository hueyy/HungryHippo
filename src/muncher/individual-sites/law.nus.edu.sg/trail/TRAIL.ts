import * as cheerio from 'cheerio'
import type { IndividualSiteMuncher } from "../../types"
import { chromium } from "playwright-chromium"
import { decode } from 'html-entities'

const BASE_URL = `https://law.nus.edu.sg`
const site = `${BASE_URL}/trail/wp-json/wp/v2/pages`

const TRAILMuncher: IndividualSiteMuncher = async (_) => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(site)

  await page.waitForLoadState()
  // @ts-ignore
  const json = await page.evaluate(() => document.body.querySelector(`pre`).innerHTML)

  const parsedJSON = JSON.parse(json)

  const items = parsedJSON.slice(1).map((item) => {
    const $ = cheerio.load(decode(item.content.rendered))
    console.log($.html())
    return {
      content: $.html(),
      date: new Date(item.modified), // it appears that the articles are created some time in advance so .date is usually 1 week earlier or more
      link: item.link,
      title: $(`h1`).first().text().trim()
    }
  })

  return {
    description: `BITS & BYTES is a monthly bulletin presented by TRAIL and its partners - Allen & Gledhill, Drew & Napier, Rajah & Tann, and WongPartnership – that showcases thought leadership in law and technology. It will cover how technology is used in or impacts different areas of law such as commercial law, intellectual property, banking and finance, tort law, privacy and data protection, and cybersecurity. The bulletin will feature commentaries on a particular area of law, technological development or legal policy, case notes and practice notes.`,
    items,
    link: site,
    title: `NUS TRAIL | Bits & Bytes`
  }
}

export default TRAILMuncher