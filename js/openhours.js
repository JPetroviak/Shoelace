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