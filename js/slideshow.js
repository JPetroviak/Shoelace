// Slideshow
function changeSlide(slides) {
	var slideActive = slides.children('.slide.active'),
		 slideActiveDuration = slideActive.data('duration'),
		 slideActiveTransitionSpeed = slideActive.data('transition-speed');	
	if (slideActive.next('.slide').length) {
		var slideNext = slideActive.next('.slide');
	} else {
		var slideNext = slides.children('.slide:first-child');
	}
	var slideNextTransitionSpeed = slideNext.data('transition-speed'),
		 timer = setTimeout(function() {
			 slideActive.css('transition-duration', slideNextTransitionSpeed + 'ms').removeClass('active').addClass('previous');
			 setTimeout(function() {
				$('.previous').removeClass('previous');
			 }, slideActiveTransitionSpeed);
			 slideNext.css('transition-duration', slideNextTransitionSpeed + 'ms').addClass('active');
			 changeSlide(slides);
		 }, slideActiveDuration + slideActiveTransitionSpeed);
	$(slides).hover(
		function() {
			clearTimeout(timer);
		},
		function() {
			changeSlide(slides);
		}
	);
}
function slideshow(slides) {
	if (slides.children('.slide').length > 1) {
		changeSlide(slides);
	}
}
slideshow($('.slides'));