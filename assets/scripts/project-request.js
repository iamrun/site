try {
  document.querySelector('.project-selector').onchange = function () {
    let projectSelector = this;
    document.querySelector('.view').classList.add('hide');
    setTimeout(function () {
      let slash = window.location.href.slice(-1);
      if (slash !== '/') { slash = '/' } else { slash = '' }
      window.location.href = window.location.href + slash + projectSelector.value
    }, 500);
  }
} catch (err){}

let swiper = new Swiper('.swiper', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  simulateTouch: false,
});

try {
  // get then set current view
  let host = window.location.host;
  let href = window.location.href;
  let path = href.split('?')[1].substring(1);
  let file = path.replaceAll('/','.')+'.htm';
  let view = href.split('?')[0] + '/view/'+file;

  let main = (function () {
    let i = 0;
    return {
      get: function () {
      },
      set: function (content) {
        try {
          document.querySelector('.view').insertAdjacentHTML('afterbegin', content);
          swiper.init();
          console.log(swiper.length);
        } catch (err) { console.log('Error: ', err); }
      }
    };
  })();

  if (view) {
    let http;

    //document.getElementById("ajaxButton").addEventListener('click', request);
    function request() {
      http = new XMLHttpRequest();

      if (!http) {
        console.log('Error - ', 'Forfeiting, cannot create an xmlhttp instance.');
        return false;
      }

      http.onreadystatechange = alertContents;
      http.open('GET', view);
      http.send();
    } request();

    function alertContents() {
      if (http.readyState === XMLHttpRequest.DONE) {
        if (http.status === 200) {
          main.set(http.responseText);
        } else {
          main.set('Error - There was a problem with the request.');
        }
      }
    }
  } else {

  }
} catch (err){}
