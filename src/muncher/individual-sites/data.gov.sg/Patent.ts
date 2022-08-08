import Request from '../Request'
import type { IndividualSiteMuncher } from '../types'

const PatentMuncher: IndividualSiteMuncher = async () => {
  const { data } = await Request.get(`https://api.data.gov.sg/v1/technology/ipos/patents`)
  // not providing date because default date is today

  const { items: applications } = data

  const items = applications.map(application => {
    const {
      summary: {
        titleOfInvention,
      },
      applicationNum,
      applicant,
      agent,
      pctApplication,
      inventors,
    } = application

    const WIPOLink = (pctApplication && `pctPublicationNum` in pctApplication)
      ? `<p><a href="https://patentscope.wipo.int/search/en/detail.jsf?docId=${pctApplication.pctPublicationNum}">WIPO</a></p>`
      : ``
    const inventorsString = Array.isArray(inventors)
      ? inventors.map(index => index.name).join(`, `)
      : ``
    const applicantString = applicant.map(a => a.name).join(`, `)
    const agentString = agent.map(a => a.name).join(`, `)
    
    return {
      content:`<div>
        <h1>${titleOfInvention}</h1>
        <p><strong>Applicant:</strong>${applicantString}</p>
        <p><strong>Agent:</strong>${agentString}</p>
        <p><strong>Inventors:</strong>${inventorsString}</p>
        <p><a href="https://patents.google.com/pagent/SG${applicationNum}/en">View on Google Patents</a></p>
        ${WIPOLink}
        </div>`,
      date: new Date(),
      link: ``,
      title: titleOfInvention
    }
  })

  return {
    description: `Patent lodgements at IPOS`,
    items,
    link: `https://data.gov.sg/dataset/ipos-apis?resource_id=6a030bf2-22da-4621-8ab0-9a5956a30ef3`,
    title: `IPOS Patent Lodgements`
  }
}

export default PatentMuncher
