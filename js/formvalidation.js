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