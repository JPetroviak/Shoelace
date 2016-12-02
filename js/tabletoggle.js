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