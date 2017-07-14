import "./header.menu.scss"
import "./header.menu.media.scss"
import "./header.menu.pug"
import $ from 'jquery';
import "fullpage.js"

$(document).ready(function() {
  $('#fullpage').fullpage({
    menu: '#menu',
    anchors:['firstPage', 'secondPage','thirdPage', 'fourthPage','fifthPage','sixthPage'],
    navigationBar: true,
    nacBar: true,
    autoScrolling: false,
    navigation: true,
    showActiveTooltip: false,
    navigationTooltips: ['firstPage', 'secondPage','thirdPage', 'fourthPage','fifthPage','sixthPage']
  });
});
$(document).on('click', '#scroll_below', function(){
  $.fn.fullpage.moveSectionDown();
});
$(document).on('click', '#pg_up', function(){
  $.fn.fullpage.moveTo('firstPage');
});

(function(){
  $(".hamburger").on("click", function() {
    $(this).parent(".hamburger_wrapper").toggleClass("hamburger_active")
  });
}());
