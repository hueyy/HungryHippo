import qs from 'qs'
import axios from 'axios'
import type { AssembleFeedOptions } from '../digestor'
import { hash } from '../utils/Helper'
import { setupCache } from 'axios-cache-interceptor'
import fileStorage from '../utils/FileStorage'

type Parameters_ = {
  q: string,
  sort: string,
  order: string,
}

type GitHubMuncher = (parameters: Parameters_) => Promise<AssembleFeedOptions>

const githubMuncher: GitHubMuncher = async ({
  q,
  sort,
  order
}: Parameters_) => {
  if(!process.env.GITHUB_OAUTH_TOKEN || process.env.GITHUB_OAUTH_TOKEN.length === 0){
    return {
      description: `GITHUB_OAUTH_TOKEN missing`,
      items: [],
      link: `https://docs.github.com/en/rest/overview/resources-in-the-rest-api#authentication`,
      title: `No Feed`,
    }
  }

  const githubClient = setupCache(
    axios.create({
      baseURL: `https://api.github.com`,
      headers: {
        'Authorization': `token ${process.env.GITHUB_OAUTH_TOKEN}`,
      },
    }),
  {
    interpretHeader: false,
    storage: fileStorage,
    ttl: 12 * 60 * 60 * 1000, // 12 hours
  }
)

  const { data } = await githubClient.get(`/search/code`, {
    params: { order, per_page: 100, q, sort }, 
  })

  const items = data.items.map(item => {
    const {
      path: filePath,
      html_url: fileURL,
      repository: {
        full_name: repoName,
        html_url: repoURL,
        description,
      }
    } = item

    const content = `
      <div>
        <p>Match for ${q}</p>
        <p><a href="${fileURL}">${filePath}</a></p>
        <p><a href="${repoURL}">${repoName}</a>: ${description}</p>
      </div>`

    return {
      content,
      id: hash(content),
      link: fileURL,
      title: `${repoName} ${filePath}`,
    }
  })

  return {
    description: `GitHub Code Search with the following parameters: q=${q}, sort=${sort}, and order=${order}`,
    items,
    link: `https://github.com/search?${
      qs.stringify({o: order, q, s: sort})
    }`,
    title: `GitHub Search: ${q}`,
  }
}

export default githubMuncher