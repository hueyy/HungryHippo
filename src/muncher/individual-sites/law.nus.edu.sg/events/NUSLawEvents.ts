import { chromium } from 'playwright-chromium'

const BASE_URL = `http://law.nus.edu.sg`
const FULL_URL = `${BASE_URL}/events/`

const NUSLawNewsMuncher = async () => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(FULL_URL)

  let items = []

  const getEventsOnPage = async (page) => {
    await page.waitForLoadState()
    const selector = `.row.event-page > .row-eq-height > .event-block`
    await page.waitForSelector(selector)

    const events = await page.$$eval(selector, (els) => els.map((el) => ({
      title: el.querySelector(`h5`).textContent.trim(),
      link: el.querySelector(`a`).getAttribute(`href`),
      content: el.innerHTML,
      date: new Date(el.querySelector(`.event-date`).textContent.trim()),
    })))
    return events
  }

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
    title: `NUS Law Events`,
    items,
    link: FULL_URL
  }
}

export default NUSLawNewsMuncher