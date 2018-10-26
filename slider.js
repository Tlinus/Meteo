function Slider( element ) {
	this.el = document.querySelector( element );
	this.init();
}	

Slider.prototype = {
	init: function() {
		this.links = this.el.querySelectorAll( "#slider-nav a" );
		this.wrapper = this.el.querySelector( "#slider-wrapper" );
		this.navigate();
		//this.autoSlide();
	},
	navigate: function() {
	
		for( var i = 0; i < this.links.length; ++i ) {
			var link = this.links[i];
			this.slide( link );	
		}
	},
	
	animate: function( slide ) {
		var parent = slide.parentNode;
		var caption = slide.querySelector( ".caption" );
		var captions = parent.querySelectorAll( ".caption" );
		for( var k = 0; k < captions.length; ++k ) {
			var cap = captions[k];
			if( cap !== caption ) {
				cap.classList.remove( "visible" );
			}
		}
		caption.classList.add( "visible" );	
	},
	
	slide: function( element ) {
		var self = this;
		element.addEventListener( "click", function( e ) {
			e.preventDefault();
			var a = this;
			self.setCurrentLink( a );
			var index = parseInt( a.getAttribute( "data-slide" ), 10 ) + 1;
			var currentSlide = self.el.querySelector( ".slide:nth-child(" + index + ")" );
			
			self.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
			//self.animate( currentSlide );
			
		}, false);
	},
	setCurrentLink: function( link ) {
		var parent = link.parentNode;
		var a = parent.querySelectorAll( "a" );
		
		link.className = "current";
		
		for( var j = 0; j < a.length; ++j ) {
			var cur = a[j];
			if( cur !== link ) {
				cur.className = "";
			}
			if( cur == link && j != a.length -1 ){
				var next = a[j+1];
				console.log("called bus");
			}else if (cur == link && j == a.length -1){
				var next = a[0];
				console.log("called");
			}
		}
		return next;
	},
	autoSlide: function(){
		this.slides = this.el.querySelectorAll( "#slider-wrapper .slide");
		var currentLink = this.el.querySelector("#slider-nav .current");
		if (currentLink == null){ currentLink = this.el.querySelector("#slider-nav a");}
		var self = this;

		setTimeout(function(){			
			var index = parseInt( currentLink.getAttribute( "data-slide" ), 10 ) + 2;
			if(self.el.querySelector(".slide:nth-child(" + index + ")") ){
				var currentSlide = self.el.querySelector(".slide:nth-child(" + index + ")");
			}else{
				var currentSlide = self.el.querySelector(".slide:nth-child(1)");
			}	
			self.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";
			self.animate( currentSlide );  
			self.setCurrentLink(self.setCurrentLink( currentLink ));
			self.autoSlide();
			
		}, 5*1000);
	}
};

document.addEventListener( "DOMContentLoaded", function() {
	

	
});
