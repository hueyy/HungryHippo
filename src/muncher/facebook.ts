import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { AssembleFeedOptions } from '../digestor'
import { chromium } from 'playwright'

type FacebookMuncherOptions = { group?: boolean}
type FacebookMuncher = (username: string, FacebookMuncherOptions) => Promise<AssembleFeedOptions>

dayjs.extend(customParseFormat)

const facebookClient = axios.create({
  baseURL: `https://www.facebook.com`
})

const parseFacebookDate = (dateString) => {
  if (dateString.split(` `).length === 5) {
    return dayjs(dateString, `D MMMM YYYY [at] HH:mm`).toDate()
  }
  return dayjs(dateString, `D MMMM [at] HH:mm`).toDate()
}

const facebookMuncher: FacebookMuncher = async (username, { group = false} = {}) => {
  if(group === true){
    const url = `https://www.facebook.com/${username}`
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(url)

    await page.waitForLoadState()

    const titleElement = page.locator(`head > title`)
    const title = await titleElement.evaluate(el => el.innerText)

    const descriptionElement = page.locator(`meta[name="description"]`)
    const description = await descriptionElement.evaluate(el => el.content)

    const postElements = page.locator(`div[role="feed"] > div div.html-div > div.html-div:has(> div[class=""])`)
    console.log(await postElements.all())
    console.log(await postElements.evaluateAll((el: any) => el.innerHTML))

  } else {
    const url = `https://www.facebook.com/${username}`
    const browser = await chromium.launch()
    const page = await browser.newPage()

    await page.goto(url)

    await page.waitForLoadState()

    const titleElement = page.locator(`head > title`)
    const title = await titleElement.evaluate(el => el.innerText)

    const descriptionElement = page.locator(`meta[name="description"]`)
    const description = await descriptionElement.evaluate(el => el.content)

    let items = []

    try {
      const postElements = await page.locator(`div[aria-posinset]`).all()
      items = await Promise.all(postElements.map(async el => {
        return {
          title: ``,
          date: new Date(),
          link: await el.locator(`span > span > a[role="link"]`).getAttribute(`href`),
          content: await el.innerHTML()
        }
      }))
    } catch (error) {
      console.error(error)
    }

    await browser.close()

    return {
      items,
      link: url,
      title,
      description
    }
  }
}

export default facebookMuncher