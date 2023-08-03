function BalfSlider(element, slide_duration, animation_duration, slide_effect){

	var interval = null;
	var current = 1;
	var slides = $(element).find('.slide');
	var slide_count = $(slides).length;
	var selectors = $(element).find('ul.selectors li');
	var previous_i = 0;
	var next_i = -1;
	var ready = true;
	var stop = false;
	var parent = this;

	if(slide_effect.hasOwnProperty('startup')){
		slide_effect.startup(slides);
	}

	$('ul.selectors li').on("click", function() {
		parent.GoToSlide($(this).index());
		$(this).addClass('active');
	});

	function clearTimer() {
		clearTimeout(interval);
	}

	this.Stop = function(){
		clearTimer();
	}

	this.GoToSlide = function(index) {
		current = index;
		clearTimer();
		next();
		startInterval();
	}

	this.Start = function() {
		//Restart timeout
		clearTimer();
		var current_index = current;
		stop = false;
		startInterval();

	}

	function startInterval(){
		interval = setInterval(function() {
			next();
		}, slide_duration + animation_duration);
	}

	function next(){
		//Next is given p for position
			if(!stop && document.hasFocus()){
				slide_effect.transition(slides, $(slides).eq(previous_i), $(slides).eq(current), animation_duration);
				current = current + 1;
				previous_i = current - 1;
				if(current >= slide_count){
					current = 0;
				}
				if(slide_effect.hasOwnProperty('animation')){
					slide_effect.animation($(slides).eq(current), slide_duration);
				}

			};
	}
}

function BalfSliderAnimations() {
	this.left_to_right = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "left" : 0}).animate({"left" : "100%"}, duration, function(){
				$(old).css({"left" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1}).animate({"left" : 0}, duration);
		};
		return this;
	};
	this.right_to_left = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "right" : 0}).animate({"right" : "100%"}, duration, function(){
				$(old).css({"right" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1}).animate({"right" : 0}, duration);
		};
		return this;
	};
	this.top_to_bottom = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "top" : 0}).animate({"top" : "100%"}, duration, function(){
				$(old).css({"top" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1}).animate({"top" : 0}, duration);
		};
		return this;
	};
	this.bottom_to_top = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "bottom" : 0}).animate({"bottom" : "100%"}, duration, function(){
				$(old).css({"bottom" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1}).animate({"bottom" : 0}, duration);
		};
		return this;
	};

	this.left_to_right_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "left" : 0, "opacity" : 1}).animate({"left" : "100%", "opacity" : 0}, duration, function(){
				$(old).css({"left" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1, "opacity" : 1}).animate({"left" : 0}, duration);
		};
		return this;
	};
	this.right_to_left_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "right" : 0, "opacity" : 1}).animate({"right" : "100%", "opacity" : 0}, duration, function(){
				$(old).css({"right" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1, "opacity" : 1}).animate({"right" : 0}, duration);
		};
		return this;
	};
	this.top_to_bottom_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "top" : 0, "opacity" : 1}).animate({"top" : "100%", "opacity" : 0}, duration, function(){
				$(old).css({"top" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1, "opacity" : 1}).animate({"top" : 0}, duration);
		};
		return this;
	};
	this.bottom_to_top_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "bottom" : 0, "opacity" : 1}).animate({"bottom" : "100%", "opacity" : 0}, duration, function(){
				$(old).css({"bottom" : "-100%", "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1, "opacity" : 1}).animate({"bottom" : 0}, duration);
		};
		return this;
	};

	this.stretch_left_to_right = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "left" : 0}).animate({"left" : "100%"}, duration, function(){
				$(old).css({"width" : "100%", "left" : 0, "z-index" : -1});
			});
			$(nxt).css({"width" : 0, "z-index" : 1}).animate({"width" : "100%", "left" : 0}, duration);
		};
		return this;
	};
	this.stretch_right_to_left = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 1, "left" : 0}).animate({"left" : "-100%"}, duration, function(){
				$(old).css({"width" : "100%", "z-index" : -1, "left" : "100%"});
			});
			$(nxt).css({"width" : 0, "z-index" : 2, "left" : "100%"}).animate({"width" : "100%", "left" : 0}, duration);
		};
		return this;
	};
	this.stretch_top_to_bottom = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "top" : 0}).animate({"top" : "100%"}, duration, function(){
				$(old).css({"height" : "100%", "top" : 0, "z-index" : -1});
			});
			$(nxt).css({"height" : 0, "z-index" : 1}).animate({"height" : "100%", "top" : 0}, duration);
		};
		return this;
	};
	this.stretch_bottom_to_top = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 1, "top" : 0}).animate({"top" : "-100%"}, duration, function(){
				$(old).css({"height" : "100%", "z-index" : -1, "top" : "100%"});
			});
			$(nxt).css({"height" : 0, "z-index" : 2, "top" : "100%"}).animate({"height" : "100%", "top" : 0}, duration);
		};
		return this;
	};
	this.fade_in = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 1}).animate({"opacity" : 0}, duration, function(){
				$(old).css({"opacity" : 0, "z-index" : -1});
			});
			$(nxt).css({"z-index" : 2, "opacity" : 0}).animate({"opacity" : 1}, duration);
		};
		return this;
	};
	this.shrink = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2}).animate({"left" : "50%", "right" : "50%", "top" : "50%", "bottom" : "50%", "width" : 0, "height" : 0}, duration, function(){
				$(old).css({"width" : "auto", "height" : "auto", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "z-index" : -1})
			});
			$(nxt).css({"z-index" : 1}).animate({"width" : "100%", "height" : "100%"}, duration);
		};
		return this;
	};
	this.shrink_and_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2}).animate({"left" : "50%", "right" : "50%", "top" : "50%", "bottom" : "50%", "width" : 0, "height" : 0, "opacity" : 0}, duration, function(){
				$(old).css({"width" : "auto", "height" : "auto", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "z-index" : -1, "opacity" : 1})
			});
			$(nxt).css({"z-index" : 1}).animate({"width" : "100%", "height" : "100%"}, duration);
		};
		return this;
	};
	this.expand = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 1});
			$(nxt).css({"z-index" : 2, "width" : 0, "height" : 0, "top" : "50%", "left" : "50%", "bottom" : "50%", "right" : "50%"}).animate({"width" : "100%", "height" : "100%", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0}, duration, function(){
				$(old).css({"z-index" : -1});
			});
		};
		return this;
	};
	this.expand_and_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 1});
			$(nxt).css({"z-index" : 2, "width" : 0, "height" : 0, "top" : "50%", "left" : "50%", "bottom" : "50%", "right" : "50%", "opacity" : 0}).animate({"width" : "100%", "height" : "100%", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "opacity" : 1}, duration, function(){
				$(old).css({"z-index" : -1});
			});
		};
		return this;
	};
	this.grow_and_blur = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 100}).css({"transform" : "scale(2)", "transition" : (duration / 1000) + "s", "filter" : "blur(20px)"}).animate({"opacity" : 0});
			setTimeout(function(){
				$(old).css({"z-index" : -1});
			}, duration);
			$(nxt).css({"z-index" : 1, "opacity" : 0}).css({"transform" : "scale(1)", "transition" : "0s", "filter" : "none"}).animate({"opacity" : 1}, duration);
		};
		return this;
	};
	this.expand_and_shrink = function(){
		this.transition = function(slides, old, nxt, duration){
			$(slides).css({"opacity" : 0});
			$(old).css({"z-index" : 2, "opacity" : 1}).animate({"left" : "50%", "right" : "50%", "top" : "50%", "bottom" : "50%", "width" : 0, "height" : 0, "opacity" : 0}, duration, function(){
				$(old).css({"width" : "auto", "height" : "auto", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "z-index" : -1, "opacity" : 1})
			});
			$(nxt).css({"z-index" : 2, "width" : 0, "height" : 0, "top" : "50%", "left" : "50%", "bottom" : "50%", "right" : "50%", "opacity" : 0}).animate({"width" : "100%", "height" : "100%", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "opacity" : 1}, duration, function(){
				$(old).css({"z-index" : -1});
			});
		};
		return this;
	};
	this.rotate = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "transition" : "transform "+(duration / 1000)+"s", "transform" : "rotate(720deg)"}).animate({"left" : "50%", "right" : "50%", "top" : "50%", "bottom" : "50%", "height" : 0, "width" : 0}, duration, function(){
				$(old).css({"width" : "auto", "height" : "auto", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "z-index" : -1, "z-index" : 0, "transform" : "rotate(0deg)", "transition" : "transform 0s"})
			});
			$(nxt).css({"z-index" : 1}).css({"width" : "100%","height" : "100%","transform" : "rotate(0deg)"}).animate({"width" : "100%", "height" : "100%"}, duration);
		};
		return this;
	};
	this.rotate_and_fade = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "transition" : "transform "+(duration / 1000)+"s", "transform" : "rotate(720deg)", "opacity" : 1}).animate({"left" : "50%", "right" : "50%", "top" : "50%", "bottom" : "50%", "height" : 0, "width" : 0, "opacity" : 0}, duration, function(){
				$(old).css({"width" : "auto", "height" : "auto", "top" : 0, "left" : 0, "bottom" : 0, "right" : 0, "z-index" : -1, "z-index" : 0, "transform" : "rotate(0deg)", "transition" : "transform 0s", "opacity" : 1})
			});
			$(nxt).css({"z-index" : 1}).css({"width" : "100%","height" : "100%","transform" : "rotate(0deg)"}).animate({"width" : "100%", "height" : "100%"}, duration);
		};
		return this;
	};
	this.fall = function(){
		this.transition = function(slides, old, nxt, duration){
			$(old).css({"z-index" : 2, "transition" : "transform "+(duration / 1000)+"s", "transform" : "rotate(25deg)"}).animate({"top" : "300%"}, duration, function(){
				$(old).css({"transform" : "rotate(0deg)", "transition" : "transform 0s", "top" : 0, "z-index" : -1});
			});
			$(nxt).css({"z-index" : 1});
		};
		return this;
	};
	this.ken_burns = function(){
		this.transition = function(slides, old, nxt, duration){
			var scale = 1.3;
			$(old).css({"z-index" : 1}).animate({"opacity" : 0}, duration, function(){
				$(old).css({"transition" : "0s", "transform-origin" : "none", "opacity" : 1, "z-index" : -1});
			});
			$(nxt).css({"opacity" : 0, "z-index" : 2}).animate({"opacity" : 1}, duration);
			var direction = 0;
			direction = Math.floor((Math.random() * 4) + 1);
			if(direction == 1){
				$(nxt).css({"transform-origin" : "top left", "transition" : (duration / 1000) * 5 + "s"});
			} else if(direction == 2){
				$(nxt).css({"transform-origin" : "bottom left", "transition" : (duration / 1000) * 5 + "s"});
			} else if(direction == 3){
				$(nxt).css({"transform-origin" : "top right", "transition" : (duration / 1000) * 5 + "s"});
			} else if(direction == 4){
				$(nxt).css({"transform-origin" : "bottom right", "transition" : (duration / 1000) * 5 + "s"});
			}

		};
		this.startup = function(slides){
			$(slides).css({"transform" : "scale(1.3)"});
		};
		this.animation = function(current, duration){

		};
		return this;

	};
}


$(document).on("ready", function(){
	var current_balfslider = new BalfSlider($(".balfslider .slides"), 3000, 8000, new BalfSliderAnimations().rotate());
	current_balfslider.Start();
})
