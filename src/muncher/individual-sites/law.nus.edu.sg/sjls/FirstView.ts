import { chromium } from 'playwright-chromium'

const BASE_URL = `https://law.nus.edu.sg/sjls/first-view-articles/`

const sjlsFirstViewMuncher = async () => {

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(BASE_URL)

  let items = []

  try {
    await page.waitForLoadState()

    items = (await page.$$eval(`.fl-col-group:nth-of-type(2) .fl-col-content.fl-node-content > .fl-module`, (els) => els.map((element) => ({
      content: element.innerHTML,
      title: element.querySelector(`.fl-rich-text > p`).textContent.trim()
    }))))

  } catch (error) {
    console.error(error)
  }

  return {
    items: items.map(element => ({ ...element, link: BASE_URL,})),
    link: BASE_URL,
    title: `Singapore Journal of Legal Studies - First View`
  }
}

export default sjlsFirstViewMuncher