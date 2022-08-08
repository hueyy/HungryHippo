import Request from "../../Request"
import * as cheerio from 'cheerio'

const BASE_URL = `https://student-journals.ucl.ac.uk`

const journalMuncher = async () => {
  const { data } = await Request.get(`${BASE_URL}/laj/`)

  const $ = cheerio.load(data)

  const items = $(`main > section:nth-of-type(3) > .row > div > .box.article`).map((_, element) => ({
    content: $(element).html(),
    date: new Date($(`span.date`, element).text().trim()),
    link: BASE_URL + $(`a.box-link`, element).attr(`href`),
    title: $(`h2`, element).text().trim()
  })).get()

  return {
    description: `The UCL Journal of Law and Jurisprudence is a law journal edited and published by graduate (Masters and PhD) students of UCL Laws. The Journal publishes scholarly contributions from academics, researchers and practitioners, as well as showcasing outstanding research of post-graduate students at UCL. It accepts submissions in all areas of law and jurisprudence, reflecting the diverse and innovative areas of research at UCL Laws, and its distinguished tradition of legal philosophy. The Journal is a generalist publication, but runs occasional themed issues. The Board of Editors assesses all submissions through a double blind peer review. Since 2015, it has been published twice annually and is available through open access.`,
    items,
    link: BASE_URL,
    title: `UCL Journal of Law and Jurisprudence`
  }
}

export default journalMuncher