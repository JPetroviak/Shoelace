// Textarea Limiter
$('textarea').each(function() {
  var textarea = $(this),
      type = textarea.attr('data-type'),
      limit = textarea.attr('data-limit'),
      helper = textarea.next('.input-helper');
  helper.html(limit + ' ' + type + ' remaining.');
  textarea.on('keydown', function(event) {
    if (type == 'words') {
      var count = textarea.val().split(/[\s]+/).length - 1;
    } else if (type == 'characters') {
      var count = textarea.val().length;
    }
    if (count >= limit) { 
      if (event.keyCode == 46 || event.keyCode == 8) {
      } else if (event.keyCode < 48 || event.keyCode > 57) {
        return false;
      }
    }
  });
  textarea.on('keyup', function() {
    if (type == 'words') {
      var count = textarea.val().split(/[\s]+/).length - 1;
    } else if (type == 'characters') {
      var count = textarea.val().length;
    }
    var remaining = limit - count;
    helper.html(remaining + ' ' + type + ' remaining.');
  });
});