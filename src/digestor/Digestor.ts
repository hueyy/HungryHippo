import { Feed } from 'feed'

const OutputTypes = {
  ATOM: `atom`,
  JSON: `json`,
  RSS: `rss`
}

const assembleFeed = ({
  title,
  description,
  link,
  image,
  items = [],
}, outputType = OutputTypes.RSS) => {
  const newFeed = new Feed({
    copyright: ``,
    description,
    generator: `HungryHippo 1.0`,
    id: ``,
    image,
    link,
    title
  })
  if (items.length > 0) {
    for (const item of items)  newFeed.addItem(item)
  }
  switch (outputType) {
    case OutputTypes.RSS: {
      return newFeed.rss2()
    }
    case OutputTypes.ATOM: {
      return newFeed.atom1()
    }
    case OutputTypes.JSON: {
      return newFeed.json1()
    }
    default: {
      throw new Error(`Invalid outputType specified`)
    }
  }
}

export default {
  OutputTypes,
  assembleFeed
}
