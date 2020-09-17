import axios from 'axios'

const igClient = axios.create({
  baseURL: `https://www.instagram.com`
})

const instagramMuncher = async handle => {
  // TODO: scrape stories
  const resp = await igClient.get(`/${handle}/?__a=1`)

  const {
    graphql: {
      user: {
        biography: bio,
        full_name: fullName,
        profile_pic_url_hd: profilePic,
        edge_owner_to_timeline_media: {
          edges: posts
        }
      }
    }
  } = resp.data
  const link = `https://instagram.com/${handle}`
  const items = posts.map(({ node: {
    display_url: image,
    taken_at_timestamp: timestamp,
    shortcode,
    edge_media_to_caption: {
      edges: captionEdges
    },
    edge_liked_by: {
      count: likes
    },
    edge_media_to_comment: {
      count: comments
    },
    edge_sidecar_to_children: sidecar
  } }) => {
    const caption = captionEdges.map(({ node: { text } }) => text).join(`\n`)
    const postLink = `https://instagram.com/p/${shortcode}`

    const images = (sidecar?.edges
      ? sidecar.edges.map(({ node: { display_url } }) => display_url)
      : [image]
    ).map(i => i.replace(/^http:\/\//, `https://`))
      .map(img => `<img src="${img}" />`)

    return {
      author: [{
        link: link,
        name: fullName,
      }],
      content: `<div>
        <p>${caption}</p>
        ${images.join(``)}
        <p>Likes: ${likes} | Comments: ${comments}</p>
        <a href="${postLink}">Link to post</a>
      </div>`,
      date: new Date(timestamp * 1000),
      image: images[0],
      link: postLink,
      title: caption
    }
  })
  return {
    description: bio,
    image: profilePic,
    items,
    link,
    title: `${fullName} (${handle})`,
  }
}

export default instagramMuncher
