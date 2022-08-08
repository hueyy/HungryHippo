import Request from '../../Request'
import { IndividualSiteMuncher } from '../../types'

const BASE_URL = `https://www.bakermckenzie.com`
const site = `${BASE_URL}/en/insight`

const insightMuncher: IndividualSiteMuncher = async (_, {
  services = ``,
  locations = ``,
}) => {
  const request = {
    AsiaPacificFilters: {
      Filter: locations.split(`,`).map(() => ({
        ID: locations,
				IsDisplayed: true,
				IsEnabled: true,
				IsSelectable: true,
				IsSelected: true
      })),
      IsDisplayed: true,
      IsEnabled: true,
      IsSelectable: true,
      IsSelected: false
    },
    PracticeFilters: services.split(`,`).map(s => ({
      ID: s,
			IsDisplayed: true,
			IsEnabled: true,
			IsSelectable: true,
			IsSelected: true
    })),
    Skip: 0,
    Take: 20
  }
  const { data } = await Request.post(
    `https://www.bakermckenzie.com/en/api/sitecore/insights/search`,
    request
  )

  const items = data.GridData.map(({
    Title,
    Summary,
    BackgroundImageUrl,
    NavigateLink: { Url },
    DisplayDate
  }) => ({
    content: Summary,
    date: new Date (DisplayDate),
    image: BackgroundImageUrl,
    link: Url,
    title: Title
  }))

  return {
    description: `Explore our insight by industries, practices and locations`,
    items,
    link: site,
    title: `Insight | Baker McKenzie`,
  }
}

export default insightMuncher