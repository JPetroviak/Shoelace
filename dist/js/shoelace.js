// Scroll to Content
$('a[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000);
      return false;
    }
  }
});

// Range Slider
$('.range').each(function() {
  var slider = $(this),
      units = slider.data('units') || '',
      helper = slider.next('.input-helper');
  this.addEventListener('input', function() {
    helper.text(slider.val() + units);
  });
});       

// Form Validation
$('form').each(function() {
  var form = $(this),
      required = $(form).find(':required'),
      submit = $(form).find('button[type=submit]');
  $(required).on('keyup keypress blur change', function() {
    if(!$(this).val()) {
      $(this).addClass('error');
    } else {
      $(this).removeClass('error');
    }
  });
  $(submit).click(function() {
    $(required).each(function() {
      if(!$(this).val()) {
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });
    if ($(required).hasClass('error')) {
      var error = $(form).find(':required.error').first();
      $('html, body').animate({
        scrollTop: error.offset().top - 25 },
        1000, function() {
          $(error).focus();
      });
      return false;
    }
  });
});

// Modal
$('[data-toggle="modal"]').each(function() {
  var toggle = $(this);
  $(toggle).click(function() {
    var modal = $(toggle).attr('data-target');
    $('body').addClass('modal-open').append('<div class="modal-backdrop"></div>');
    $('.modal-backdrop').fadeIn();
    $(modal).addClass('open').fadeIn();
  });
});
function dismissModal() {
  $('body.modal-open').removeClass('modal-open'); 
  $(".modal-backdrop").fadeOut(function(){
    $(this).remove();
  });
  $('.modal-backdrop').fadeOut();
  $('.modal.open').removeClass('open').fadeOut();
}
$('.modal').click(function(e){
  var container = $('.modal-content');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    dismissModal();
  }
});
$('[data-dismiss="modal"]').click(dismissModal);
$(document).keyup(function(e){
  var code = e.keyCode || e.which;
  if(code === 27 && $('body').hasClass('modal-open')) {
    dismissModal();
  }
});

// Open Hours
var date = new Date(),
    days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
    day = days[date.getDay()],
    today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ',
    hours = date.getHours(),
    minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes;
}
var time = hours + ':' + minutes,
    now = Date.parse(today + time),
    closing = 30 * 60 * 1000;
$(".hours ." + day).each(function () {
  var status = $(this).data('status'),
      open = $(this).data('open'),
      open = Date.parse(today + open),
      close = $(this).data('close'),
      close = Date.parse(today + close);
  if ($(this).hasClass(day)) {
    if (status === 'open') {
      if (now >= open && now < close - closing) {
        $(this).addClass('background-color-success');
      } else if (now >= close - closing && now < close) {
        $(this).addClass('background-color-warning');
      }  else {
        $(this).addClass('background-color-danger');
      }
    } else if (status === 'closed') {
      $(this).addClass('background-color-danger');
    }
  }
});

// Table Toggle
$('.table.toggle-row').each(function() {
  var table = $(this);
  $(table).children('tbody').children('tr:not(.table-row-hidden)').each(function () {
    var toggleRow = $(this),
        toggle = $(toggleRow).children('td:not(.table-cell-link-skip)'),
        contentRow = $(toggleRow).next('tr.table-row-hidden'),
        content = $(contentRow).children('td').children();
    $(toggle).click(function() {
      if ($(toggleRow).hasClass('active')) {
        $(toggleRow).removeClass('active');
        $(content).slideUp('fast');
      }
      else {
        $(toggleRow).siblings('.active').removeClass('active').next('tr.table-row-hidden').children('td').children().slideUp('fast');
        $(toggleRow).addClass('active');
        $(content).slideDown('fast');
      }
    });
  });
});

// Accordion
$('.accordion-group').each(function() {
  var group = $(this);
  $(group).children('.accordion').each(function () {
    var accordion = $(this),
        toggle = $(accordion).children('.accordion-toggle');
    if ($(accordion).hasClass('open')) {
      $(accordion).children('.accordion-content').show();
    }
    $(toggle).click(function() {
      if ($(accordion).hasClass('open')) {
        $(accordion).removeClass('open').children('.accordion-content').slideUp('fast');
      }
      else {
        $(accordion).siblings('.open').removeClass('open').children('.accordion-content').slideUp('fast');
        $(accordion).addClass('open').children('.accordion-content').slideDown('fast');
      }
    });
  });
});

// Slideshow
function changeSlide(slides) {
	var slideActive = slides.children('.slide.active'),
		 slideActiveDuration = slideActive.data('duration'),
		 slideActiveTransitionSpeed = slideActive.data('speed');	
	if (slideActive.next('.slide').length) {
		var slideNext = slideActive.next('.slide');
	} else {
		var slideNext = slides.children('.slide:first-child');
	}
	var slideNextTransitionSpeed = slideNext.data('speed'),
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