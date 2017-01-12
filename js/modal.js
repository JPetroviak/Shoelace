// Modal
$('[data-toggle="modal"]').each(function() {
  var toggle = $(this);
  toggle.click(function() {
    var modal = toggle.attr('data-target');
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