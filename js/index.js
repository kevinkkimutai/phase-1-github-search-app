document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector('#user-list')
  const inputForm = document.querySelector('#github-form')
  const repoList = document.getElementById("repos-list")
  fetch('https://api.github.com/users')
  .then(res => res.json())
  .then(data => data.forEach(element => {
    createDom(element, list)
  }))

  inputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const input = document.querySelector('#search');
    list.innerHTML = ''
    handleSearch(input)
  })

  function handleSearch(input) {
    fetch(`https://api.github.com/search/users?q=${input.value}`)
    .then(res => res.json())
    .then(data => {
      (data.items).forEach(item => {
        createDom(item, list)
      })
    })
  }




function handleRepos(user) {
  fetch(`https://api.github.com/users/${user}/repos`)
  .then(response => response.json())
  .then(data => {
     
      let heading = document.createElement("h3")
      heading.innerText = `${user} Repos:`
      repoList.append(heading)
      data.forEach(item => {
          const repoName = item["name"]
          let repoItem = document.createElement("li")
          repoItem.innerHTML = `
          <div class="links">
            <a href="https://github.com/kevinkkimutai/${repoName}">${repoName}</a>
            </div>
          `
          repoList.append(repoItem)
      })
  })
}

function createDom(user, li){
  const item = document.createElement("li")
  const link = document.createElement("li")
  item.innerHTML = `
    <div class="row">
    <div class="column right">
    <h2>${user.login}</h2>
    </div>
    <div class="column left">
    <img src="${user.avatar_url}"></img
    </div>
    </div>
    `
    link.innerHTML = `
    <div class="links">
            <a href="https://api.github.com/users/${user.login}">${user.login}</a>
            </div>
    `
  li.appendChild(item)
  li.appendChild(link)
  item.addEventListener("click", function() {
    const user = this.innerText;
    repoList.innerHTML = ''
    handleRepos(user)
})


}
})