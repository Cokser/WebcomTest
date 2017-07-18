import "./header.menu.scss"
import "./header.menu.media.scss"
import "./header.menu.pug"
import $ from 'jquery';
import "fullpage.js"

$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
    anchors:['first-page', 'second-page','third-page', 'fourth-page','fifth-page','sixth-page'],
    fitToSection: false,
    autoScrolling: false,
    navigation: true,
    showActiveTooltip: true,
    navigationTooltips: ['first-page', 'second-page','third-page', 'fourth-page','fifth-page','sixth-page']
  });
});
$(document).on('click', '#scroll-below', function(){
  $.fn.fullpage.moveSectionDown();
});
$(document).on('click', '#pg-up', function(){
  $.fn.fullpage.moveTo('first-page');
});

(function(){
  $(".hamburger").on("click", function() {
    $(this).parent(".hamburger-wrapper").toggleClass("hamburger-active")
  });
}());
