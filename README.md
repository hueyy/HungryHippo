# HungryHippo

<img src="https://live.staticflickr.com/3436/3225591269_5001acef98_b_d.jpg" width="300" />

> To a hungry hippo, everything is a feed

HungryHippo generates RSS/ATOM/JSON feeds from regularly-updating public sites.

## Examples

| Site               |                                       Sample Link                                        | HungryHippo Link                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Facebook           |                [facebook.com/smbccomics](https://facebook.com/smbccomics)                | [/facebook/smbccomics](https://hungryhippo.huey.xyz/facebook/smbccomics)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Twitter            |            [twitter.com/onedevloperarmy](https://twitter.com/onedevloperarmy)            | [/twitter/onedevloperarmy](https://hungryhippo.huey.xyz/twitter/onedevloperarmy)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Instagram          | [instagram.com/nathanwpylestrangeplanet](https://instagram.com/nathanwpylestrangeplanet) | [/instagram/nathanwpylestrangeplanet](https://hungryhippo.huey.xyz/instagram/nathanwpylestrangeplanet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| UCL News           |                        [ucl.ac.uk/news](https://ucl.ac.uk/news/)                         | [/individual-site/ucl.ac.uk/news/?url=https://search2.ucl.ac.uk/s/search.json?collection=drupal-push-news-news&meta_UclCommunicationType=%22top+stories%22](https://hungryhippo.huey.xyz/individual-site/ucl.ac.uk/news/?title=UCL%20News&description=Follow%20all%20the%20latest%20news%20from%20the%20UCL%20media%20relations%20team,%20view%20UCL%27s%20presence%20in%20the%20media,%20and%20get%20in%20touch%20for%20more%20information%20and%20access%20to%20UCL%20experts.&url=https://search2.ucl.ac.uk/s/search.json?collection=drupal-push-news-news&meta_UclCommunicationType=%22top+stories%22) |
| Telegraph          |              [telegraph.co.uk/opinion](https://www.telegraph.co.uk/opinion)              | [/individual-site/telegraph.co.uk/?url=https://www.telegraph.co.uk/opinion/](https://hungryhippo.huey.xyz/individual-site/telegraph.co.uk/?url=https://www.telegraph.co.uk/opinion/)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| UCL Laws News      |                  [ucl.ac.uk/laws/news](https://www.ucl.ac.uk/laws/news)                  | [/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-laws-new%26&meta_UclOrgUnit=%22UCL Faculty of Laws%22&title=UCL%20Laws%20News](https://hungryhippo.huey.xyz/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-laws-new%26&meta_UclOrgUnit=%22UCL%20Faculty%20of%20Laws%22&title=UCL%20Laws%20News)                                                                                                                                                                                                           |
| UCL UCU News       |                   [ucl.ac.uk/ucu/news](https://www.ucl.ac.uk/ucu/news)                   | [/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-professional-services-news%26meta_UclOrgUnit="UCL UCU"&title=UCL UCU](https://hungryhippo.huey.xyz/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-professional-services-news%26meta_UclOrgUnit=%22UCL%20UCU%22&title=UCL%20UCU)                                                                                                                                                                                                                           |
| Singapore Law Blog |                    [singaporelawblog.sg](https://singaporelawblog.sg)                    | [/individual-site/singaporelawblog.sg](https://hungryhippo.huey.xyz/individual-site/singaporelawblog.sg)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| The Edge (SG)      |                   [theedgesingapore.com](https://theedgesingapore.com)                   | [/individual-site/theedgesingapore.com](https://hungryhippo.huey.xyz/individual-site/theedgesingapore.com)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| PDPC (SG)          |                          [pdpc.gov.sg](https://www.pdpc.gov.sg)                          | [/individual-site/pdpc.gov.sg/undertaking](https://hungryhippo.huey.xyz/individual-site/pdpc.gov.sg/undertaking)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Pop the HungryHippo link into a RSS reader like [Feedly](https://feedly.com), [BazQux](https://bazqux.com/), or [RSSOwl](http://www.rssowl.org). Or you can [use IE](https://www.wikihow.com/Subscribe-to-and-Read-RSS-Feeds-with-Internet-Explorer).

You can get a list of supported sites by visiting [/individual-site](https://hungryhippo.huey.xyz/individual-site).

## Running HungryHippo

With docker-compose:

```bash
  docker build . -t hungryhippo
  docker run -p 3000:3000 hungryhippo
```

Without docker:

```bash
  npm ci
  npm run start:dev
```

## Development

I may have taken the Hungry Hippo theme a bit too far. In short:

- Muncher: scrapes websites
- Digestor: turns scraped items into feeds

## Credits

[Photo taken by David Goehring](https://www.flickr.com/photos/carbonnyc/3225591269)
