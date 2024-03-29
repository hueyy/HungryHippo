# HungryHippo

![Docker Image Version (latest semver)](https://img.shields.io/docker/v/hueyy/hungryhippo?label=docker%20version)
![GitHub](https://img.shields.io/badge/licence-EUPL--1.2-blue)

<img src="https://live.staticflickr.com/3436/3225591269_5001acef98_b_d.jpg" width="300" />

> To a hungry hippo, everything is a feed

HungryHippo generates RSS/ATOM/JSON feeds from regularly-updating public sites.

## Examples

| Site                       | Sample Link                                                                                                                                                                                                                    | HungryHippo Link                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|:-------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Telegraph                  | [telegraph.co.uk/opinion](https://www.telegraph.co.uk/opinion)                                                                                                                                                                 | [/individual-site/telegraph.co.uk/?url=https://www.telegraph.co.uk/opinion/](https://hungryhippo.huey.xyz/individual-site/telegraph.co.uk/?url=https://www.telegraph.co.uk/opinion/)                                                                                                                                                                                                                                                                                                                                                                                                                       |
| UCL Laws News              | [ucl.ac.uk/laws/news](https://www.ucl.ac.uk/laws/news)                                                                                                                                                                         | [/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-laws-new%26&meta_UclOrgUnit=%22UCL Faculty of Laws%22&title=UCL%20Laws%20News](https://hungryhippo.huey.xyz/individual-site/ucl.ac.uk/news/?url=https://cms-feed.ucl.ac.uk/s/search.json?collection=drupal-laws-new%26&meta_UclOrgUnit=%22UCL%20Faculty%20of%20Laws%22&title=UCL%20Laws%20News)                                                                                                                                                                                                           |
| The Edge (SG)              | [theedgesingapore.com](https://theedgesingapore.com)                                                                                                                                                                           | [/individual-site/theedgesingapore.com](https://hungryhippo.huey.xyz/individual-site/theedgesingapore.com)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| PDPC (SG) - Undertakings   | [pdpc.gov.sg](https://www.pdpc.gov.sg)                                                                                                                                                                                         | [/individual-site/pdpc.gov.sg/undertaking](https://hungryhippo.huey.xyz/individual-site/pdpc.gov.sg/undertaking)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| GitHub Code Search         | [github.com/search](https://github.com/search)                                                                                                                                                                                 | [/github?q="xkcd.com"](https://hungryhippo.huey.xyz/github?q="xkcd.com")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| SAL Annual Review of Cases | [journalsonline.academypublishing.org.sg/e-First/Singapore-Academy-of-Law-Annual-Review-of-Singapore-Cases](https://journalsonline.academypublishing.org.sg/e-First/Singapore-Academy-of-Law-Annual-Review-of-Singapore-Cases) | [/individual-site/academypublishing.org.sg/annual-review-of-cases](https://hungryhippo.huey.xyz/individual-site/academypublishing.org.sg/annual-review-of-cases)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| SAL Journal                | [journalsonline.academypublishing.org.sg/Journals/Singapore-Academy-of-Law-Journal/e-First](https://journalsonline.academypublishing.org.sg/Journals/Singapore-Academy-of-Law-Journal/e-First)                                 | [/individual-site/academypublishing.org.sg/sal-journal](https://hungryhippo.huey.xyz/individual-site/academypublishing.org.sg/sal-journal)                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| SAL Practitioner (Fintech) | [journalsonline.academypublishing.org.sg/Journals/SAL-Practitioner/Fintech](https://journalsonline.academypublishing.org.sg/Journals/SAL-Practitioner/Fintech)                                                                 | [/individual-site/academypublishing.org.sg/sal-practitioner/?area=Fintech](https://hungryhippo.huey.xyz/individual-site/academypublishing.org.sg/sal-practitioner/?area=Fintech)                                                                                                                                                                                                                                                                                                                                                                                                                         |


Pop the HungryHippo link into a RSS reader like [Feedly](https://feedly.com), [BazQux](https://bazqux.com/), or [RSSOwl](http://www.rssowl.org). Or you can [use IE](https://www.wikihow.com/Subscribe-to-and-Read-RSS-Feeds-with-Internet-Explorer).

You can get a list of supported sites by visiting [/individual-site](https://hungryhippo.huey.xyz/individual-site).

If something isn't working or if you would like a new site to be added, please [create a GitHub issue](https://github.com/hueyy/HungryHippo/issues/new).

## Running HungryHippo

With docker:

```bash
  docker build . -t hungryhippo
  docker run -p 3000:3000 hungryhippo
```

Without docker:

```bash
  pnpm i
  pnpm run start:dev
```

### GitHub

Optionally, provide the `GITHUB_OAUTH_TOKEN` environment variable to enable the GitHub search RSS feeds.

## Development

I may have taken the Hungry Hippo theme a bit too far. In short:

- Muncher: scrapes websites
- Digestor: turns scraped items into feeds


## Credits

[Photo taken by David Goehring](https://www.flickr.com/photos/carbonnyc/3225591269)
