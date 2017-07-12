{
	function Slider() {
	  this.interval = 5000;
		this.currentSlide = document.getElementById('active_slide');
		this.slides = document.getElementsByClassName('bombit_slide');
		this.buttons = document.getElementsByClassName('bombit_nav_button_click');
    this.currentButton = document.getElementById('active_button_click');
    this.nextButton = document.getElementById('right_button_click');
    this.prevousButton = document.getElementById('left_button_click');
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
		this.currentSlide = document.getElementById('active_slide');
		this.currentButton = document.getElementById('active_button');
		var slidesArray = this.slides;
		var buttonsArray = this.buttons;
		for (var i = 0; i < slidesArray.length; i++) {
			if( slidesArray[i] === this.currentSlide && buttonsArray[i] === this.currentButton ) {
				this.currentButton = buttonsArray[i];
			}
		}
	}

	Slider.prototype.swithcSlide = function(){
		var slidesArray = this.slides;
		var buttonsArray = this.buttons;
		for (var i = 0; i < buttonsArray.length; i++) {
			if ( buttonsArray[i] === this.currentButton) {
				if ( this.currentSlide.id !== slidesArray[i].id ) {
					this.currentSlide.id = ' ';
					this.currentButton.id = ' ';
					this.currentSlide = slidesArray[i];
					this.currentButton = buttonsArray[i];
					this.currentSlide.id = 'active_slide';
					this.currentButton.id = 'active_button';
					break;
				} 
				else if( buttonsArray[i] !== buttonsArray[buttonsArray.length-1] ) {
					this.currentSlide.id = ' ';
					this.currentButton.id = ' ';
					this.currentSlide = slidesArray[i+1];
					this.currentButton = buttonsArray[i+1];
					this.currentSlide.id = 'active_slide';
					this.currentButton.id = 'active_button';
					break;
				}
				if ( this.currentButton === buttonsArray[buttonsArray.length-1] ) {
					this.currentSlide.id = ' ';
					this.currentButton.id = ' ';
					this.currentSlide = slidesArray[0];
					this.currentButton = buttonsArray[0];
					this.currentSlide.id = 'active_slide';
					this.currentButton.id = 'active_button';
					break;
				}
			}
		}
	}
	
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
    tempButton.id = ' ';
		clearInterval(bombitSlider.sliderTimer);
    bombitSlider.swithcSlide();
    bombitSlider.getCurrentValues();
    startSliderTimer( bombitSlider );
	}
  initSlider();
}