import { chromium } from 'playwright-chromium'

const BASE_URL = `http://law.nus.edu.sg`
const FULL_URL = `${BASE_URL}/events/`

const getEventsOnPage = async (page) => {
  await page.waitForLoadState()
  const selector = `.row.event-page > .row-eq-height > .event-block`
  await page.waitForSelector(selector)

  return await page.$$eval(selector, (els) => els.map((element) => ({
    content: element.innerHTML,
    date: new Date(element.querySelector(`.event-date`).textContent.trim()),
    link: element.querySelector(`a`).getAttribute(`href`),
    title: element.querySelector(`h5`).textContent.trim(),
  })))
}

const NUSLawNewsMuncher = async () => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(FULL_URL)

  let items = []

  try {
    items = [...(await getEventsOnPage(page))]

    await page.click(`#nextMonth > a.next`)

    items = [
      ...items,
      ...(await getEventsOnPage(page))
    ].reverse()


  } catch (error) {
    console.error(error)
  }


  await browser.close()

  return {
    items,
    link: FULL_URL,
    title: `NUS Law Events`
  }
}

export default NUSLawNewsMuncher