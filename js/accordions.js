// Accordions
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