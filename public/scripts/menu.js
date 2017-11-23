$(() => {

  $.get('/api/food_type')
    .done(function(data) {
    });

  $.get('/api/items')
    .done(function(data) {
    });

  $('#menu_item').on('click', 'button', function(event) {
  });

});