/*
--------------------------------------------------
split-test.js
--------------------------------------------------
*/

(function () {
  'use strict';

  if (window.XMLHttpRequest) {
    let http,
        local = 'http://localhost:5500/dashboard/split-test/',
        host  = window.location.href,
        port  = 5500,
        path,
        view;

    if (host.includes('iamms.co'))  { path = 'https://iamms.co/dashboard/split-test/'  }
    if (host.includes('localhost')) { path = 'http://localhost:'+port+'/dashboard/split-test/' }

    Array.from(document.querySelectorAll('.view-link')).forEach(e => {
      e.addEventListener('click', () => {
        view = e.dataset.viewPath;
        getPage(path, view);
      });
    });

    function getPage(path, view) {
      http = new XMLHttpRequest();
      if (!http) {
        alert('Giving up :( cannot create an XMLHTTP instance');
        return false;
      }
      http.onreadystatechange = setPage;
      http.open('GET', path + view);
      http.send();
    }

    function setPage() {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          document.querySelector('main').innerHTML = http.responseText;
        } else {
          console.log('There was a problem with the request.');
        }
      }
    }
  }
}());
