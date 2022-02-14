try {
  document.querySelector('.project-selector').onchange = function () {
    let projectSelector = this;
    document.querySelector('.view').classList.add('hide');
    setTimeout(function () {
      let slash = window.location.href.slice(-1);
      //if (slash !== '/') { slash = '/' } else { slash = '' }
      window.location.href = '/project-request/' + projectSelector.value;
    }, 500);
  }
} catch (err){}

let swiper = new Swiper('.swiper', {
  hashNavigation: true,
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
  // get url parameters
  let params = new URLSearchParams(window.location.href.split('?')[1]);

  // get and set current view
  let host = window.location.host;
  let href = window.location.href;
  let path = href.split('?')[1].substring(1);
  //console.log(path);
  let file = params.get('view')+'.htm';
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

let slides = (function (content) {
  let i = 0;
  return {
    enable: function (content) {
      let slideToEnable = document.querySelector('.swiper .swiper-slide:nth-child(' + (content + 1) +')');
      if (slideToEnable.classList.contains('disabled')) {
        slideToEnable.classList.remove('disabled')
      }
    },
    disable: function (content) {
      let slideToDisable = document.querySelector('.swiper .swiper-slide:nth-child(' + (content + 1) +')');
      if (!slideToDisable.classList.contains('disabled')) {
        slideToDisable.classList.add('disabled')
      }
    }
  }
});

function enableSlide(index) {
  let slideToEnable = document.querySelector('.swiper .swiper-slide:nth-child(' + (index + 1) +')');
  if (slideToEnable.classList.contains('disabled')) {
    slideToEnable.classList.remove('disabled');
    document.querySelector(
      '.swiper .swiper-slide:nth-child(' + (index + 1) +') fieldset'
    ).removeAttribute('disabled');
  }
}

function disableSlide(index) {
  let slideToDisable = document.querySelector('.swiper .swiper-slide:nth-child(' + (index + 1) +')');
  if (!slideToDisable.classList.contains('disabled')) {
    slideToDisable.classList.add('disabled');
    document.querySelector(
      '.swiper .swiper-slide:nth-child(' + (index + 1) +') fieldset'
    ).setAttribute('disabled', 'true');
  }
}

function swiperActions() {
  swiper.on('slideChange', function(e) {
    localStorage.setItem('iam.run.currentSlide', swiper.activeIndex);
  });

  document.querySelector('.restart').onclick = function() {
    let confirmRestart = 'You are about to reset your project request. You will lose all the information you\'ve provided. Would you like to continue doing so? ';
    if (confirm(confirmRestart) === true) {
      window.location.href = window.location.href.split('/project-request')[0]+'/project-request/';
      localStorage.setItem('iam.run.currentSlide', 0);
    }
  }
}

function disableSlide(index) {
  let slide = document.querySelector('.swiper .swiper-slide:nth-child(' + (index + 1) +')');
  try { slide.classList.add('disabled'); } catch (err){}
}

function enableSlide(index) {
  let slide = document.querySelector('.swiper .swiper-slide:nth-child(' + (index + 1) +')');
  try { slide.classList.remove('disabled'); } catch (err){}
}

function switchSlideToSkip(index) {
  let toViewIndex,
      toSkipIndex;

  toViewIndex = Number(index);

  if (toViewIndex === swiper.activeIndex + 1) {
    toSkipIndex = swiper.activeIndex + 2;
    enableSlide(toViewIndex);
    disableSlide(toSkipIndex);
  }

  if (toViewIndex === swiper.activeIndex + 2) {
    toSkipIndex = swiper.activeIndex + 1;
    enableSlide(toViewIndex);
    disableSlide(toSkipIndex);
  }
  //console.log('View: ', toViewIndex + "\n" + 'Skip:', toSkipIndex);
}

function swiperConditions() {

  document.querySelectorAll('.swiper-slide form').forEach(
    slideForm => slideForm.addEventListener('submit', function(e) {
      e.preventDefault();
      swiper.slideNext();
    })
  );

  document.querySelectorAll('.slide-button-last').forEach(
    slideButtonLast => slideButtonLast.addEventListener('click', function(e) {
      if (swiper.activeIndex > 0) {
        swiper.slideTo(swiper.activeIndex - 1);
      }
    })
  );

  document.querySelectorAll('.slide-button-next').forEach(
    slideButtonNext => slideButtonNext.addEventListener('click', function(e) {

    })
  );
}
