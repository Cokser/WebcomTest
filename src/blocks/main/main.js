import "./main.scss"
import "./main.pug"
import "./main-media.scss"
import "./slider"

// Toggle the visibility of the modal window
function toggleModal() {
  var state = modal.getAttribute('data-state');
  if (state == 'open') {
    modal.setAttribute('data-state', 'closed');
  } else {
    modal.setAttribute('data-state', 'open');
  }
}

// Element Variables
var modal = document.querySelector('.modal');
var modalwindow = document.querySelector('.modal-window');
var toggles = document.querySelectorAll('[data-toggle]');

// Assign event handlers to every element with the 'data-toggle' attribute
for (var i = 0; i < toggles.length; i++) {
  toggles[i].addEventListener('click', function() {
    toggleModal();
  });
}

// Prevent a click on the modal window itself from closing it
modalwindow.addEventListener('click', function() {
  event.stopPropagation();
});