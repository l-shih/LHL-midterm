exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('items').del()
      .then(function () {
        return Promise.all([
          knex('items').insert({type: 'BEVERAGES', title: 'Coca-Cola', description: 'Perfect with any meal, enjoy the genuine taste of Coca-Cola.', price: 2.50, restaurant_id: 1}),
          knex('items').insert({type: 'BEVERAGES', title: 'Sprite', description: 'Let Sprite refresh your day with the great taste of lemon-lime.', price: 2.50, restaurant_id: 1}),
          knex('items').insert({type: 'BEVERAGES', title: 'Strawberry Banana Smoothie ', description: 'Our Strawberry Banana Smoothie is made fresh when you order and it is the perfect snack to keep you going all day.', price: 3.50, restaurant_id: 1}),
          knex('items').insert({type: 'BURGERS', title: 'Bacon King', description: 'Our BACON KING Sandwich features two ¼ lb savory flame-grilled beef patties, topped a with hearty portion of thick-cut smoked bacon, melted American cheese and topped with ketchup and creamy mayonnaise all on a soft sesame seed bun.', price: 5.78, restaurant_id: 1}),
          knex('items').insert({type: 'BURGERS', title: 'Single Stacker', description: 'Single Stacker boasts a flame-grilled beef patty, melted cheese and crispy bacon.', price: 6.00, restaurant_id: 1}),
          knex('items').insert({type: 'BURGERS', title: 'Hamburger', description: 'Try our Hamburger, a signature flame-grilled beef patty topped with a simple layer of crunchy pickles, yellow mustard, and ketchup on a toasted sesame seed bun.', price: 6.50, restaurant_id: 1}),
          knex('items').insert({type: 'DESSERTS', title: 'New York Style Cheesecake', description: 'Our delicious New York Style Cheesecake is served on a thick, buttery Graham cracker crust. One mouth-watering bite and you’ll be back for more.', price: 3.00, restaurant_id: 1}),
          knex('items').insert({type: 'DESSERTS', title: 'Soft Serve Cone', description: 'We didn’t invent soft serve, but with one taste of our cool, creamy, and velvety Vanilla Soft Serve, you’ll think we perfected it. Your choice of classic cone or cup.', price: 2.00, restaurant_id: 1}),
          knex('items').insert({type: 'DESSERTS', title: 'Caramel Sundae', description: 'Cool and creamy, our made-to-order Caramel Sundae is prepared with our velvety Vanilla Soft Serve and finished with a delicious caramel swirl.', price: 3.45, restaurant_id: 1})
        ]);
      })
  ])
};
