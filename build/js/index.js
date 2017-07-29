webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(9).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

﻿{
	function Slider() {
	  this.interval = 5000;
		this.slides = document.getElementsByClassName('bombit-slide');
    this.buttons = document.getElementsByClassName('bombit-nav-button-click');
    this.currentSlide = document.getElementsByClassName('active-slide')[0];
    this.currentButton = document.getElementsByClassName('active-button')[0];
    this.nextButton = document.getElementById('right-button-click');
    this.prevousButton = document.getElementById('left-button-click');
    this.navigators = [ this.nextButton ,this.prevousButton ];
  }
	function initSlider(){
		var bombitSlider = new Slider();
		setButtonEvents( bombitSlider );
    setNavigationEvents( bombitSlider );
    startSliderTimer( bombitSlider );
    bombitSlider.getCurrentValues();
  }
  function getCurrentButton( clickedButton , bombitSlider ) {
    for( var i = 0; i < bombitSlider.buttons.length; i++ ) {
      if ( bombitSlider.buttons[i] === bombitSlider.currentButton ) {
        for ( var j = 0; j < bombitSlider.navigators.length; j++ ) {
          if ( clickedButton === bombitSlider.prevousButton ) {
            if( bombitSlider.buttons[i] !== bombitSlider.buttons[0] ){
              bombitSlider.currentButton = bombitSlider.buttons[i - 1];
              return bombitSlider.currentButton;
            } else {
              bombitSlider.currentButton = bombitSlider.buttons[ bombitSlider.buttons.length-1 ];
              return bombitSlider.currentButton;
            }
          } else if ( clickedButton === bombitSlider.nextButton ) {
            if( bombitSlider.buttons[i] !== bombitSlider.buttons[bombitSlider.buttons.length-1] ) {
              bombitSlider.currentButton = bombitSlider.buttons[i + 1];
              return bombitSlider.currentButton;
            } else {
              bombitSlider.currentButton = bombitSlider.buttons[0];
              return bombitSlider.currentButton;
            }
          } else {
            bombitSlider.currentButton = clickedButton;
            return bombitSlider.currentButton;
          }
        }
      }
    }
  }
	function startSliderTimer( bombitSlider ) {
		bombitSlider.sliderTimer = setInterval(function() {
      bombitSlider.getCurrentValues();
      bombitSlider.swithcSlide();
    }, bombitSlider.interval);
	}

	Slider.prototype.getCurrentValues = function() {
		this.currentSlide = document.getElementsByClassName('active-slide')[0];
		this.currentButton = document.getElementsByClassName('active-button')[0];
		var slidesArray = this.slides;
		var buttonsArray = this.buttons;
		for (var i = 0; i < slidesArray.length; i++) {
			if( slidesArray[i] === this.currentSlide && buttonsArray[i] === this.currentButton ) {
				this.currentButton = buttonsArray[i];
			}
		}
	};
	var myClass = {
		addMyClass: function( myObjectName, myClass ) {
      myObjectName.className += ' ' + myClass;
		},
		removeMyClass: function ( myObjectName, myClass ) {
      myObjectName.className = myObjectName.className.replace( ' '  + myClass, "");
    }
	};
	Slider.prototype.swithcSlide = function(){
		var slidesArray = this.slides;
		var buttonsArray = this.buttons;
		for (var i = 0; i < buttonsArray.length; i++) {
			if ( buttonsArray[i] === this.currentButton) {
				if ( this.currentSlide.className !== slidesArray[i].className ) {
          myClass.removeMyClass( this.currentSlide, 'active-slide' );
          myClass.removeMyClass( this.currentButton, 'active-button' );
					this.currentSlide = slidesArray[i];
					this.currentButton = buttonsArray[i];
          myClass.addMyClass( this.currentSlide, 'active-slide' );
          myClass.addMyClass(  this.currentButton, 'active-button' );
					break;
				} 
				else if( buttonsArray[i] !== buttonsArray[buttonsArray.length-1] ) {
          myClass.removeMyClass( this.currentSlide, 'active-slide' );
          myClass.removeMyClass(  this.currentButton, 'active-button' );
					this.currentSlide = slidesArray[i+1];
					this.currentButton = buttonsArray[i+1];
          myClass.addMyClass( this.currentSlide, 'active-slide' );
          myClass.addMyClass(  this.currentButton, 'active-button' );
					break;
				}
				if ( this.currentButton === buttonsArray[buttonsArray.length-1] ) {
          myClass.removeMyClass( this.currentSlide, 'active-slide' );
          myClass.removeMyClass(  this.currentButton, 'active-button' );
          this.currentSlide = slidesArray[0];
          this.currentButton = buttonsArray[0];
          myClass.addMyClass( this.currentSlide, 'active-slide' );
          myClass.addMyClass(  this.currentButton, 'active-button' );
					break;
				}
			}
		}
	};
	
	function setButtonEvents( bombitSlider ) {
		for (var i = 0; i < bombitSlider.buttons.length; i++) {

			bombitSlider.buttons[i].addEventListener( 'click', function(){
				clickEvent( this, bombitSlider );
			},false );
		}
	}

  function setNavigationEvents( bombitSlider ) {
    for (var i = 0; i < bombitSlider.navigators.length; i++) {

      bombitSlider.navigators[i].addEventListener( 'click', function(){
        clickEvent( this, bombitSlider );
      },false );
    }
  }

	function clickEvent( clickedButton, bombitSlider ){

		var tempButton = bombitSlider.currentButton;
    bombitSlider.currentButton = getCurrentButton( clickedButton, bombitSlider );
    myClass.removeMyClass( tempButton, 'active-button' );
		clearInterval(bombitSlider.sliderTimer);
    bombitSlider.swithcSlide();
    bombitSlider.getCurrentValues();
    startSliderTimer( bombitSlider );
	}
  initSlider();
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(11);
__webpack_require__(19);
__webpack_require__(22);
__webpack_require__(25);
__webpack_require__(28);
__webpack_require__(1);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_menu_scss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__header_menu_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__header_menu_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_menu_media_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_menu_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__header_menu_media_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_menu_pug__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_menu_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__header_menu_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bombit_scroll__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__bombit_scroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__bombit_scroll__);





/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
var menuItems = [["главная","second-page"],["портфолио","third-page"],["преимущества","fourth-page"],["схема работы",""],["отзывы","fifth-page"],["контакты","sixth-page"]];
pug_html = pug_html + "\n\u003Cheader id=\"header-menu\"\u003E\n  \u003Cdiv class=\"logo\"\u003E\u003C\u002Fdiv\u003E\n  \u003Cnav class=\"nav-menu\"\u003E\n    \u003Cul class=\"menu-items\"\u003E\n      \u003Cli class=\"item\"\u003E\u003Ca class=\"item-link\" href=\"#second-page\"\u003E" + (pug.escape(null == (pug_interp = "главная") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n      \u003Cli class=\"item\"\u003E\u003Ca class=\"item-link\" href=\"#third-page\"\u003E" + (pug.escape(null == (pug_interp = "портфолио") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n      \u003Cli class=\"item\"\u003E\u003Ca class=\"item-link\" href=\"#fourth-page\"\u003E" + (pug.escape(null == (pug_interp = "преимущества") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n      \u003Cli class=\"fake-item\"\u003E\u003Ca class=\"item-link\" href=\"#\"\u003E" + (pug.escape(null == (pug_interp = "схема работы") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n      \u003Cli class=\"item\"\u003E\u003Ca class=\"item-link\" href=\"#fifth-page\"\u003E" + (pug.escape(null == (pug_interp = "отзывы") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n      \u003Cli class=\"item\"\u003E\u003Ca class=\"item-link\" href=\"#sixth-page\"\u003E" + (pug.escape(null == (pug_interp = "контакты") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\n    \u003C\u002Ful\u003E\n  \u003C\u002Fnav\u003E\n  \u003Cdiv class=\"phones\"\u003E\u003Ca class=\"phone-link\" href=\"href\"\u003E" + (pug.escape(null == (pug_interp = "+375(29)123-45-67") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Ca class=\"phone-link\" href=\"href\"\u003E" + (pug.escape(null == (pug_interp = "+375(29)123-45-67") ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n  \u003Cdiv class=\"container container-hamburger\"\u003E\n    \u003Cdiv class=\"hamburger-wrapper\"\u003E\n      \u003Cdiv class=\"hamburger\"\u003E\n        \u003Cdiv id=\"menu-button\"\u003E\u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cdiv class=\"hamburger-menu\"\u003E\n        \u003Cul class=\"main-links\"\u003E";
// iterate menuItems
;(function(){
  var $$obj = menuItems;
  if ('number' == typeof $$obj.length) {
      for (var i = 0, $$l = $$obj.length; i < $$l; i++) {
        var menuItem = $$obj[i];
pug_html = pug_html + "\n          \u003Cli" + (" class=\"delay\""+pug.attr("data-menuanchor", menuItem[1], true, true)) + "\u003E\u003Ca" + (pug.attr("href", "#" + menuItem[1], true, true)) + "\u003E" + (pug.escape(null == (pug_interp = menuItem[0]) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var i in $$obj) {
      $$l++;
      var menuItem = $$obj[i];
pug_html = pug_html + "\n          \u003Cli" + (" class=\"delay\""+pug.attr("data-menuanchor", menuItem[1], true, true)) + "\u003E\u003Ca" + (pug.attr("href", "#" + menuItem[1], true, true)) + "\u003E" + (pug.escape(null == (pug_interp = menuItem[0]) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n        \u003C\u002Ful\u003E\n        \u003Cdiv class=\"secondary-links\"\u003E\n          \u003Cdiv class=\"row\"\u003E\u003Ca href=\"#\"\u003Einstagram\u003C\u002Fa\u003E\u003Ca href=\"#\"\u003Etwitter\u003C\u002Fa\u003E\u003Ca href=\"#\"\u003Efacebook\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n          \u003Cdiv class=\"row\"\u003E\n            \u003Cp\u003Ecopyright © 2015 | Webcom Media\u003C\u002Fp\u003E\n          \u003C\u002Fdiv\u003E\n        \u003C\u002Fdiv\u003E\n      \u003C\u002Fdiv\u003E\n    \u003C\u002Fdiv\u003E\n  \u003C\u002Fdiv\u003E\n\u003C\u002Fheader\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 10 */
/***/ (function(module, exports) {

let BombitScroll = {
    mainItems: document.querySelectorAll('.item'),
    barItems: document.querySelectorAll('.bar-item'),
    customItems: document.querySelectorAll('.custom-item'),
    scrollItems: [],
    controls: ['menu-items'],
    initEvents: function () {
        this.scrollItems.push(this.mainItems, this.customItems, this.barItems); // Add your navigation arrays
        for (var i = 0; i < this.scrollItems.length; i++) {
            for (let item of this.scrollItems[i]) {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollTo(e.target.hash, { duration: 350 });
                });
            }
        }
    },
    scrollTo: (target, options) => {
        let start = window.pageYOffset;
        let opts = {
            duration: options.duration,
            offset: options.offset || 0,
            callback: options.callback,
            easing: options.easing || _easeInOutQuad
        };
        let distance = typeof target === 'string' ? opts.offset + document.querySelector(target).getBoundingClientRect().top : target;
        let duration = typeof opts.duration === 'function' ? opts.duration(distance) : opts.duration;
        let timeStart, timeElapsed;
        requestAnimationFrame((time) => {
            timeStart = time;
            _loop(time);
        });
        // loop
        let _loop = (time) => {
            timeElapsed = time - timeStart;
            window.scrollTo(0, opts.easing(timeElapsed, start, distance, duration));
            if (timeElapsed < duration)
                requestAnimationFrame(_loop);
            else
                end();
        };
        // end
        let end = () => {
            window.scrollTo(0, start + distance);
            if (typeof opts.callback === 'function')
                opts.callback();
        };
        // easing
        function _easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1)
                return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    }
};
BombitScroll.initEvents();


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_pug__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main_pug__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_media_scss__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__main_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__main_media_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slider__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__slider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__slider__);





// Toggle the visibility of the modal window

function toggleModal() {
  var state = modal.getAttribute('data-state');
  if (state === 'open') {
    modal.setAttribute('data-state', 'closed');
  } else {
    modal.setAttribute('data-state', 'open');
  }
}

// Element Variables
var modal = document.querySelector('.modal');
var modalwindow = document.querySelector('.modal-window');
var modalSuccess = document.querySelector('.modal-success');
var toggles = document.querySelectorAll('[data-toggle]');
var requestForm = document.querySelector('.request-form');
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
requestForm.onsubmit = function () {
  requestForm.style.display = 'none';
  modalSuccess.style.display = 'flex';
  return false;
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_indent = [];
pug_html = pug_html + "\n\u003Cmain id=\"main\"\u003E\n  \u003Csection class=\"slider-wrapper\"\u003E\n    \u003Cdiv id=\"bomit-slider\"\u003E\u003Cimg" + (" class=\"bombit-slide active-slide\""+pug.attr("src", __webpack_require__(14), true, true)) + "\u003E\u003Cimg" + (" class=\"bombit-slide\""+pug.attr("src", __webpack_require__(15), true, true)) + "\u003E\u003Cimg" + (" class=\"bombit-slide\""+pug.attr("src", __webpack_require__(16), true, true)) + "\u003E\u003Cimg" + (" class=\"bombit-slide\""+pug.attr("src", __webpack_require__(17), true, true)) + "\u003E\u003C\u002Fdiv\u003E\n    \u003Carticle class=\"main-content\"\u003E\n      \u003Ch1 class=\"main-title\"\u003E" + (pug.escape(null == (pug_interp = "Главный Заголовок") ? "" : pug_interp)) + "\u003C\u002Fh1\u003E\n      \u003Cdiv class=\"delimiter\"\u003E\u003C\u002Fdiv\u003E\n      \u003Ch3 class=\"main-description\"\u003E" + (pug.escape(null == (pug_interp = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et doloremagna aliqua") ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\n      \u003Cdiv class=\"slider-nav\"\u003E\n        \u003Cbutton class=\"nav-button left-button\" type=\"button\" id=\"left-button-click\"\u003E\u003C\u002Fbutton\u003E\n        \u003Cbutton class=\"nav-button right-button\" type=\"button\" id=\"right-button-click\"\u003E\u003C\u002Fbutton\u003E\n      \u003C\u002Fdiv\u003E\n      \u003Cbutton class=\"feedback-button\" data-toggle=\"true\"\u003Eоформить заявку\u003C\u002Fbutton\u003E\n      \u003Csection id=\"nav-bar\"\u003E\n        \u003Cbutton class=\"slider-nav-button bombit-nav-button-click active-button\"\u003E\u003C\u002Fbutton\u003E\n        \u003Cbutton class=\"slider-nav-button bombit-nav-button-click\"\u003E\u003C\u002Fbutton\u003E\n        \u003Cbutton class=\"slider-nav-button bombit-nav-button-click\"\u003E\u003C\u002Fbutton\u003E\n        \u003Cbutton class=\"slider-nav-button bombit-nav-button-click\"\u003E\u003C\u002Fbutton\u003E\n      \u003C\u002Fsection\u003E\u003Ca class=\"custom-item\" id=\"scroll-below\" href=\"#portfolio\"\u003E\u003C\u002Fa\u003E\n    \u003C\u002Farticle\u003E\n  \u003C\u002Fsection\u003E\n\u003C\u002Fmain\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-1.jpg";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-2.jpg";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-3.jpg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg-4.jpg";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__portfolio_scss__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__portfolio_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__portfolio_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__portfolio_media_scss__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__portfolio_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__portfolio_media_scss__);



/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__advantages_scss__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__advantages_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__advantages_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__advantages_media_scss__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__advantages_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__advantages_media_scss__);



/***/ }),
/* 23 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reviews_scss__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reviews_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__reviews_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reviews_media_scss__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reviews_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__reviews_media_scss__);



/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_scss__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__footer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__footer_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer_media_scss__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__footer_media_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__footer_media_scss__);



/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[2]);