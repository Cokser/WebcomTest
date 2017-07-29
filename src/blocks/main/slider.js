{
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