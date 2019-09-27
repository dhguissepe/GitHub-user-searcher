import '../scss/styles.scss'
import GateWay from './GateWay.js'

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

function handleClick(e) {
  e.preventDefault()

  $errorMessage.classList.remove('active')
  $userInfo.classList.remove('active')
  $repoList.classList.remove('no-repos')
  $miniLoader.classList.add('active')

  fetchData($formInput.value)
}

$formBtn.addEventListener('click', handleClick)

const fetchData = async (user) => {
  const getCurrentUserData = new GateWay(user)
  try {
    const userSummary = await getCurrentUserData.getUserSummary()
    const userRepos = await getCurrentUserData.getUserRepos()
    onResponse(userSummary, userRepos)

  } catch(error) {
    $miniLoader.classList.remove('active')
    onError(error)
  }
}

const onResponse = ({ login, name, bio, avatar_url }, repos) => {
  $miniLoader.classList.remove('active')

  $avatar.setAttribute('src', avatar_url)

  if (login) {
    $username.innerHTML = `@${ login }`
  } else {
    $username.innerHTML = "No username available"
  }

  if (name) {
    $fullName.innerHTML = name
  } else {
    $fullName.innerHTML = "No full name available"
  }

  if (bio) {
    $userBio.innerHTML = bio
  } else {
    $userBio.innerHTML = "No bio available"
  }

  $repoList.innerHTML = ""

  if (repos.length) {
    repos.forEach((item) => createNewListElement(item))
  } else {
    $repoList.classList.add('no-repos')
    $repoList.innerHTML = 'This user has no available repositories.'
  }

  $userInfo.classList.add('active')
}

const onError = (error) => {
  $miniLoader.classList.remove('active')
  $errorMessage.innerHTML = `Something went wrong: ${ error }.`
  $errorMessage.classList.add('active')
}

const createNewListElement = ({ name, stargazers_count, forks_count }) => {
  const newListElement = document.createElement('li')

  $repoList.appendChild(newListElement)
  newListElement.classList.add('repo')
  newListElement.innerHTML = `<h3 class="repo-name">${ name }</h3>
                              <div class="repo-summary">
                                <i class="icon-star-full"></i><span class="stars">${ stargazers_count }</span>
                                <i class="icon-flow-branch"></i><span class="forks"> ${ forks_count } </span>
                              </div>`
}