class GateWay {
  constructor(user) {
    this.userSummaryEndpoint = `/users/${ user }`
    this.userReposEndpoint =`/users/${ user }/repos`
  }

  BASE_URL = 'https://api.github.com'

  async callGitHubApi(endpoint, options= {}) {
    options.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.v3+json'
    }

    const url = this.BASE_URL + endpoint
    const response = await fetch(url, options)
    const data = await response.json()

    if (data.message == 'Not Found') {
      throw `User ${data.message}`
    }

    return data
  }

  getUserSummary() {
    return this.callGitHubApi(this.userSummaryEndpoint)
  }

  getUserRepos() {
    return this.callGitHubApi(this.userReposEndpoint)
  }
}

export default GateWay