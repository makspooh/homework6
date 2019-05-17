'use strict';

// task 1
// 1.1 В ответе есть заголовок "access-control-allow-origin: *"
// 1.2 В ответе нет заголовков "response-headers"
// 1.3 В ответе есть заголовок "access-control-allow-origin: https://facebook.com"

// task 2
function sentRequest(url) {
  return new Promise(function(resolve, reject) {

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        const error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error('Fail'));
    };
    xhr.send();
    
  });
}
sentRequest('https://tanuhaua.github.io/datas-file-json/github_users.json')
  .then(response => {
    return JSON.parse(response);
  })
  .then(users => {
    users.forEach(user => {
      sentRequest(`https://api.github.com/users/${user.githubName}`)
        .then(response => {
          const user = JSON.parse(response);
          const body = document.querySelector('body');
          const block = document.createElement('div');
          const [login, src] = [user.login, user.avatar_url];
          const paragraph = document.createElement('p');
          const img = document.createElement('img');

          paragraph.textContent = login;
          img.setAttribute('src', src);
          block.appendChild(paragraph);
          block.appendChild(img);
          body.appendChild(block);

          body.style.display = 'flex';
          body.style.flexWrap = 'wrap';
          body.style.justifyContent = 'space-around';

          block.style.display = 'flex';
          block.style.flexDirection = 'column';
          block.style.alignItems = 'center';

          paragraph.style.fontFamily = 'sans-serif';
          paragraph.style.fontSize = '20px';

          img.style.width = '250px';
          img.style.borderRadius = '50%';
        });
    });
  })

// task 3
function sentFetchRequest(url) {
  fetch(url)  
    .then(response => response.json())
    .then(data => {
      data.forEach(users => {
        fetch(`https://api.github.com/users/${users.githubName}`)
          .then(response => response.json())
          .then(data => {
            const body = document.querySelector('body');
            const block = document.createElement('div');
            const [login, src] = [data.login, data.avatar_url];
            const paragraph = document.createElement('p');
            const img = document.createElement('img');
    
            paragraph.textContent = login;
            img.setAttribute('src', src);
            block.appendChild(paragraph);
            block.appendChild(img);
            body.appendChild(block);
    
            body.style.display = 'flex';
            body.style.flexWrap = 'wrap';
            body.style.justifyContent = 'space-around';
    
            block.style.display = 'flex';
            block.style.flexDirection = 'column';
            block.style.alignItems = 'center';
    
            paragraph.style.fontFamily = 'sans-serif';
            paragraph.style.fontSize = '20px';
    
            img.style.width = '250px';
            img.style.borderRadius = '50%';
          });
      });
    })
  }
sentFetchRequest('https://tanuhaua.github.io/datas-file-json/github_users.json')
