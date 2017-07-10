/**
 * Created by valeriy on 29/06/17.
 */
import "./header.menu.scss"
import "./header.menu.media.scss"
import "./header.menu.pug"
import $ from 'jquery';
import "fullpage.js"

$(document).ready(function() {
  $('#fullpage').fullpage({
    //Navigation
    menu: '#menu',
    lockAnchors: false,
    anchors:['firstPage', 'secondPage','thirdPage', 'fourthPage','fifthPage','sixthPage'],
    navigationPosition: 'left',
    scrollBar: true,
    navigationBar: true
  });
});

(function(){
  $(".hamburger").on("click", function() {
    $(this).parent(".hamburger-wrapper").toggleClass("hamburger-active")
  });

}());
