// Make sure document is ready:
$(() => {
  $.ajax({
    method: 'GET',
    url: '/api'
  }).done((users) => {
    for(user of users) {
      $('<div>').text(user.name).appendTo($('body'));
    }
  });
});
