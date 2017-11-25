$(() => {
  /*
  * items categories
  */
  $.get('/api/food_type')
    .done(function(data) {
      let sortData = data.map(function(ele) {
        return ele.type;
      }).sort();

      for(let type of sortData){
        let child = `<a href=""><li>${type}</li></a>`;
        $(child).appendTo('#menu_categories ul');

        let typeChild = `<dev id="${type}"></dev>`;
        $(typeChild).appendTo('.menu_items');
      }

      /*
      * items display
      */
      $.get('/api/items')
        .done(function(data) {
          for(let item of data){
            let child = `
              <div class="panel panel-default">
                <article class="panel-body">
                  <header>${item.title}</header>
                  <p class="description">${item.description}</p>
                  <p class="price" data-price=${item.price}>$${item.price}</p>
                  <button type="button" class="glyphicon glyphicon-plus"></button>
                </article>
              </div>
            `;

            $(child).hide().appendTo(`#menu_item .menu_items #${item.type}`);
          }

          $('#menu_item .menu_items :first-child').children().slideDown();
        });
    });

  //show up item after categories click
  $('#menu_categories ul').on('click', 'a', function(event) {
    event.preventDefault();
    let showPart = $(this).text();
    $(`#menu_item section`).children().hide();
    $(`#menu_item section #${showPart}`).show().children().fadeIn();
  });

  /*
  * items order box
  */
  //add item price to order box
  $('#menu_item').on('click', 'button', function(event) {
    let price = Number($(this).parent().find('.price').text().replace('$',''));
    price *= 1.12;
    let total = Number($('#menu_order #total').data('total')) + price;
    //set total
    $('#menu_order #total').data('total', total.toFixed(2));
    $('#menu_order #input_total').val(total.toFixed(2));
    $('#menu_order #total').text(`Total: $${total.toFixed(2)}`);

    //show item on order box
    let title = $(this).parent().find('header').text();
    let quantity = $(`#menu_order .order_item .${title.replace(/\s+/g, '')} .quantity`).data('quantity');

    if(!!quantity){
      quantity++;
    } else{
      quantity = 1;
      //not add item yet
      let item_order =
      `<div class="panel panel-default ${title.replace(/\s+/g, '')}">
        <p id="item_title">${title}</p>
        <p class='quantity'></p>
        <p id="unit_price" data-price=${(price/1.12).toFixed(2)}>Price: $${(price/1.12).toFixed(2)}</p>
        <input id="quantity" type="hidden" name="item_name" value=0>
        <button id="cancel_button" type='button' class="glyphicon glyphicon-minus"></button>
      </div>`;

      $(item_order).hide().appendTo($('#menu_order .order_item')).slideDown();
    }

    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} #quantity`).val(`${title} ${quantity}`)
    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} .quantity`).text(`Quantity: ${quantity}`);
    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} .quantity`).data('quantity', quantity);
  });

  //cancel button for cancel order in order box
  $('#menu_order').on('click', '#cancel_button', function(event) {
    let quantity = $(this).parent().find('.quantity').data().quantity;
    let totalprice = $('#menu_order #input_total').val();
    let priceToSub = $(this).parent().find('#unit_price').data().price;
    let title = $(this).parent().find('#item_title').text().replace(/\s+/g, '');

    totalprice -= (priceToSub * 1.12);

    //decrease total
    $('#menu_order #total').data('total', totalprice.toFixed(2));
    $('#menu_order #input_total').val(totalprice.toFixed(2));
    $('#menu_order #total').text(`Total: $${totalprice.toFixed(2)}`);

    //decrease quantity
    quantity--;
    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} #quantity`).val(`${title} ${quantity}`)
    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} .quantity`).text(`Quantity: ${quantity}`);
    $(`#menu_order .order_item .${title.replace(/\s+/g, '')} .quantity`).data('quantity', quantity);

    if(quantity === 0){
      $(this).parent().slideUp();
      $(this).parent().remove();
    }
  });

  /*
  * send SMS
  */
  $('#menu_order #order_item').on('click', '.submit_total', function(event) {
    $(this).preventDefault;
    console.log('ok');
  });

});



