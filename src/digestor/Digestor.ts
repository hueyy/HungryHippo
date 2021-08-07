import { Feed, FeedOptions, Item } from 'feed'

const OutputTypes = {
  ATOM: `atom`,
  JSON: `json`,
  RSS: `rss`
}

interface HungryHippoItem extends Omit<Item, `date`> {
  date?: Date,
}
export interface AssembleFeedOptions extends Omit<FeedOptions, `id` | `copyright`> {
  items: HungryHippoItem[],
  id?: string,
  copyright?: string,
}

const assembleFeed = ({
  title,
  description,
  link,
  image,
  items = [],
}: AssembleFeedOptions, outputType = OutputTypes.RSS): string => {
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
    for (const item of items)  newFeed.addItem(item as Item)
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
