//Importing assets
import api from './api.js'
import '../scss/styles.scss'

//HTML elements that are going to interact
const $errorMessage = document.getElementById('error-message')
const $formBtn = document.getElementById('main-form--btn')
const $formInput = document.getElementById('main-form--input')
const $miniLoader = document.getElementById('mini-loader')

const $userInfo = document.getElementById('user-info-wrapper')
const $avatar = document.getElementById('avatar')
const $fullName = document.getElementById('full-name')
const $username = document.getElementById('username')
const $userBio = document.getElementById('user-bio')

const $repoList = document.getElementById('repo-list')

//handling events
function handleClick(e) {
  e.preventDefault()

  $errorMessage.classList.remove('active')
  $userInfo.classList.remove('active')
  $repoList.classList.remove('no-repos')
  $miniLoader.classList.add('active')

  fetchData($formInput.value)
}

$formBtn.addEventListener('click', handleClick)

//Fetching User Data function
const fetchData = async (user) => {
  try {
    const data = await api.users.get(user)
    const repos = await api.users.getRepos(user)

    onResponse(data, repos)
  }
  catch(error) {
    $miniLoader.classList.remove('active')
    onError(error)
  }
}

//Actions after fetching user data
const onResponse = (data, repos) => {
  $miniLoader.classList.remove('active')

  //Showing user summary
  $avatar.setAttribute('src', data['avatar_url'])

  if (data.login) {
    $username.innerHTML = `@${ data.login }`
  } else {
    $username.innerHTML = "No user name"
  }

  if (data.name) {
    $fullName.innerHTML = data.name
  } else {
    $fullName.innerHTML = "No full name available"
  }

  if (data.bio) {
    $userBio.innerHTML = data.bio
  } else {
    $userBio.innerHTML = "No bio available"
  }

  //showing user repos
  $repoList.innerHTML = ""

  if (repos.length) {
    for(let i = 0; i < repos.length; i++) {
      createNewListElement(repos[i])
    }
  } else {
    $repoList.classList.add('no-repos')
    $repoList.innerHTML = 'This user has no available repositories.'
  }


  $userInfo.classList.add('active')
}

const onError = (error) => {
  $miniLoader.classList.remove('active')

  //Showing error
  $errorMessage.innerHTML = `Something went wrong. ${ error }.`
  $errorMessage.classList.add('active')
}

//Utilities
const createNewListElement = (repo) => {
  const newListElement = document.createElement('li')

  $repoList.appendChild(newListElement)
  newListElement.classList.add('repo')
  newListElement.innerHTML = `<h3 class="repo-name">${ repo.name }</h3>
                              <div class="repo-summary">
                                <i class="icon-star-full"></i><span class="stars">${ repo.stargazers_count }</span>
                                <i class="icon-flow-branch"></i><span class="forks"> ${ repo.forks_count } </span>
                              </div>`
}