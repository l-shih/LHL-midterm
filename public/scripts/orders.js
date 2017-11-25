$(() => {
  $.get('/api/orders')
    .done(function(data) {
      for(let order of data){
        let partial = `
          <li>User Order Number: ${order.id}
            <ul style='list-style-type: none'>
            <li>Total Order Price: ${order.total_price}</li>
            <li>Order paid at: ${order.paid_at}</li>
            <li>Order available for pick up in roughly ${order.est_ready_time}</li>
            </ul>
            <br>
          </li>
        `;

        $(partial).appendTo('.order-details ul');
      }
    });

});
