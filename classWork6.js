'use strict';

function sentRequest(url) {
  return new Promise(function(resolve, reject) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(this.response);
      } else {
        let error = new Error(this.statusText);
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
    let users = JSON.parse(response);
    return users;
  })
  .then(users => {
    users.forEach(user => {
      return sentRequest(`https://api.github.com/users/${user.githubName}`)
        .then(response => {
          let user = JSON.parse(response);
          let body = document.querySelector('body');
          let block = document.createElement('div');
          let login = user.login;
          let paragraph = document.createElement('p');
          let img = document.createElement('img');
          let src = user.avatar_url;

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
        })
    })
  })

function sentFetchRequest(url) {
  fetch(url)  
    .then(response => response.json())
    .then(data => {
      let users = data;
      users.forEach(user => {
        fetch(`https://api.github.com/users/${user.githubName}`)
          .then(response => response.json())
          .then(data => {
            let users = data;
            let body = document.querySelector('body');
            let block = document.createElement('div');
            let login = users.login;
            let paragraph = document.createElement('p');
            let img = document.createElement('img');
            let src = users.avatar_url;
    
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
          })
      });
    })
  }
sentFetchRequest('https://tanuhaua.github.io/datas-file-json/github_users.json')