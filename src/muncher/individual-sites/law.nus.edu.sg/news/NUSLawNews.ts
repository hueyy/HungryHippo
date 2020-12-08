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

    items = await page.$$eval(`#news-listing-widget .col-lg-12.row-eq-height`, (els) => els.map((el) => ({
      title: el.querySelector(`.news-title`).textContent.trim(),
      link: el.querySelector(`a`).getAttribute(`href`),
      content: el.innerHTML,
      date: new Date(el.querySelector(`.news-date`).textContent.trim()),
      image: el.querySelector(`.news-image > img`).getAttribute(`src`)
    })))


  } catch (error) {
    console.error(error)
  }


  await browser.close()

  return {
    title: `NUS Law Media`,
    items,
    link: FULL_URL
  }
}

export default NUSLawNewsMuncher