$(() => {
  function createOrdersReviewElement(order) {
    var order = `<article class='order'>
                  <header class='header'>
                    <p>This is the header of the Order Review</p>
                  </header>
                  <main='order_details'>
                    <p>This part is for the order details</p>
                  </main>
                </article>`
    return order;
  }
  function renderOrderReview(order) {
    var $eachOrder = createOrdersReviewElement(order);
    $('#order_main').append($eachOrder);
  }
  function loadOrderReview(order) {
    $.ajax({
      method: 'GET',
      url: '/api/',
      success: function(order) {
        renderOrderReview(order);
      }
    });
  }
});