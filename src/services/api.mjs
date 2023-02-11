import axios from 'axios'

const data = JSON.stringify({
  query: `query {
  articles(PAGE: 1, PAGE_SIZE: 10, isFree: true) {
    Articles {
      _id
      name
      subtitle
	  searchContent
      tags {
        _id
        name
      }
      categories {
        _id
        name
      }
    }

  }
}`,
  variables: {},
})

var config = {
  method: 'post',
  url: 'https://demo-api.sandsmedia.com/graphql',
  headers: {
    'Content-Type': 'application/json',
  },
  data: data,
}
export const getArticles = async () => {
  try {
    return (await axios(config)).data
  } catch (error) {
    console.log('Failed to retrieve data:', error)
  }
}
