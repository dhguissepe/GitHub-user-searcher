const BASE_URL = 'https://api.github.com'

//API calls
async function callGitHubApi(endpoint, options= {}) {

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json'
  }

  const url = BASE_URL + endpoint
  const response = await fetch(url, options)
  const data = await response.json()

  //Throwing exception if not found
  if (data.message == 'Not Found') {
    throw `TypeError: 404 ${data.message}`
  }

  return data
}

/*Below an object with the methods get and getRepos which calls callGitHubApi function.
It is possible to append other different methods to this object if needed, making
it scalabe.*/

const api = {
  users: {
    get(user) {
      return callGitHubApi(`/users/${ user }`)
    },
    getRepos(user) {
      return callGitHubApi(`/users/${ user }/repos`)
    }
  }
}

export default api