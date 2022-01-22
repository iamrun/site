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
  initialSlide: (function() {
    if (localStorage.getItem('iam.run.currentSlide')) {
      return localStorage.getItem('iam.run.currentSlide');
    }
    return 0;
  })(),
  simulateTouch: false,

});

try {
  // get and set current view
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
          swiperActions();
          swiperConditions();
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

function swiperActions() {
  swiper.on('slideChange', function(e) {
    localStorage.setItem('iam.run.currentSlide', swiper.activeIndex);
  });

  document.querySelector('.restart').onclick = function() {
    let confirmRestart = 'You are about to abort your request. You will lose all information you\'ve provided. Would you like to continue doing so? ';
    if (confirm(confirmRestart) === true) {
      window.location.href = window.location.href.split('/project-request')[0]+'/project-request/';
      localStorage.setItem('iam.run.currentSlide', 0);
    }
  }
}


function swiperConditions() {
  document.querySelectorAll('[name="new-account"]').forEach(item => {
    item.addEventListener('click', event => {
      if (item.value === 'Yes') {
        swiper.slideTo(3);
        if (document.querySelector('.slide-new-account').classList.contains('disabled')) {
          document.querySelector('.slide-new-account').classList.remove('disabled');
        }
      }
      if (item.value === 'No') {
        document.querySelector('.slide-new-account').classList.add('disabled');
        swiper.slideTo(4);
      }
    });
  });
}
