import { chromium } from 'playwright-chromium'

const BASE_URL = `http://law.nus.edu.sg`
const FULL_URL = `${BASE_URL}/media`

const NUSLawNewsMuncher = async () => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(FULL_URL)

  let items = []

  try {
    await page.waitForLoadState()
    await page.waitForSelector(`#news-listing-widget .col-lg-12.row-eq-height`)

    items = await page.$$eval(`#news-listing-widget .col-lg-12.row-eq-height`, (els) => els.map((element) => ({
      content: element.innerHTML,
      date: new Date(element.querySelector(`.news-date`).textContent.trim()),
      image: element.querySelector(`.news-image > img`).getAttribute(`src`),
      link: element.querySelector(`a`).getAttribute(`href`),
      title: element.querySelector(`.news-title`).textContent.trim()
    })))


  } catch (error) {
    console.error(error)
  }


  await browser.close()

  return {
    items,
    link: FULL_URL,
    title: `NUS Law Media`
  }
}

export default NUSLawNewsMuncher