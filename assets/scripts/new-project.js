// init swiper
var swiper = new Swiper('.swiper.new-project', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  simulateTouch:false,
});

function createProject() {
  let taskName = document.querySelector('[name="task-name"]');
  let taskDescription = document.querySelector('[name="task-description"]');

  if (taskName.value.length > 0 && taskDescription.value.length > 0) {
    const data = {
      "Task Name": taskName.value,
      "Task Description": taskDescription.value,
    };

    fetch('https://hooks.zapier.com/hooks/catch/11304969/b1waa0h/', {
      method: 'POST',
      headers: {'Accept': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
      console.log('Zapier Post | Success:', data);
    })
      .catch((error) => {
      console.error('Zapier Post | Error:', error);
    });
  } else {
    //alert ('Yo, put some info in the damn boxes dude!');
  }
}

document.querySelector('.swiper-button-next').onclick = function () {
  if (swiper.activeIndex === 1) {
    createProject();
  }
}
