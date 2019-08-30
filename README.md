# HungryHippo

<img src="https://live.staticflickr.com/3436/3225591269_5001acef98_b_d.jpg" width="300" />

> To a hungry hippo, everything is a feed

HungryHippo generates RSS/ATOM/JSON feeds from regularly-updating public sites.

## Examples

| Site      |                                       Sample Link                                        | HungryHippo Link                                                                                         |
| --------- | :--------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------- |
| Facebook  |                [facebook.com/smbccomics](https://facebook.com/smbccomics)                | [/facebook/smbccomics](https://hungryhippo.ketupat.me/facebook/smbccomics)                               |
| Twitter   |            [twitter.com/onedevloperarmy](https://twitter.com/onedevloperarmy)            | [/twitter/onedevloperarmy](https://hungryhippo.ketupat.me/twitter/onedevloperarmy)                       |
| Instagram | [instagram.com/nathanwpylestrangeplanet](https://instagram.com/nathanwpylestrangeplanet) | [/instagram/nathanwpylestrangeplanet](https://hungryhippo.ketupat.me/instagram/nathanwpylestrangeplanet) |

Pop the HungryHippo link into a RSS reader like [Feedly](https://feedly.com), [TinyTinyRSS](https://tt-rss.org/), or [RSSOwl](www.rssowl.org). Or you can [use IE](https://www.wikihow.com/Subscribe-to-and-Read-RSS-Feeds-with-Internet-Explorer).

## Site Support

- [x] Facebook (public pages)
- [x] Twitter (public)
- [x] Instagram (public)
- [x] Drupal

## Running HungryHippo

With docker-compose:

```bash
  docker build . -t hungryhippo
  docker run -p 3000:3000 hungryhippo
```

Without docker:

```bash
  npm ci
  npm run start
```

## Credits

[Photo taken by David Goehring](https://www.flickr.com/photos/carbonnyc/3225591269)
