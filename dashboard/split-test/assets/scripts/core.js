(function () {
  'use strict';

  if (window.XMLHttpRequest) {
    let http,
      path = 'http://localhost:5500/',
      view;

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
