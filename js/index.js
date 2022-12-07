
const init = () => {
    const inputForm = document.querySelector('form')
 
  
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.querySelector('input#search');
  
     fetch(`https://api.github.com/search/users?q=${input.value}`)
      .then(response => response.json())
      .then(data => {
        (data.items).forEach(user => {
        const list = document.querySelector('#user-list');
      list.innerHTML = `
      <div class="column left">
      <h2>${user.login}</h2>
      <img src="${user.avatar_url}"></img
      <div class="links">
      <br>
      <a href="${user.html_url}">${user.html_url}</a>
      </div>
      <button class="btn">repos</button
      </div>
      `

      });

      
    });
    const li = document.querySelector('#user-list')
    li.addEventListener('click', (event) => {
      event.preventDefault();
  
     fetch(`https://api.github.com/users/${repo.login}/repos`)
      .then(response => response.json())
      .then(data => {
        (data.items).forEach(repo => {
        const li = document.querySelector('#repos-list');
      li.innerHTML = `
      <div class="column left">
      <h2>${repo.login}</h2>
      </div>
      `
      });
    });
  })
  })
  

}
  document.addEventListener('DOMContentLoaded', init);