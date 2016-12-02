// Range Slider
$('.range').each(function() {
  var slider = $(this),
      units = slider.data('units') || '',
      helper = slider.next('.input-helper');
  this.addEventListener('input', function() {
    helper.text(slider.val() + units);
  });
});
