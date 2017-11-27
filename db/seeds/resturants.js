exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('restaurants').del()
      .then(function () {
        return Promise.all([
          knex('restaurants').insert({name: 'Lighthoust Pub', phone: '+1888-569-6898', street: '128 W Hastings St #300', city: 'vancouver', province: 'BC', postal_code: 'V6B 1G8'}),
          knex('restaurants').insert({name: 'Fake Res One', phone: '+1222-333-4444', street: 'Fake Street', city: 'Fake city', province: 'Fake province', postal_code: 'Fake code'})
        ]);
      })
      
      .then(function() {
        return Promise.all([
          knex('items').del()
            .then(function () {
              return Promise.all([
                knex('items').insert({type: 'BEVERAGES', title: 'Coca-Cola', description: 'Perfect with any meal, enjoy the genuine taste of Coca-Cola.', price: 2.50, restaurant_id: 1}),
                knex('items').insert({type: 'BEVERAGES', title: 'Sprite', description: 'Let Sprite refresh your day with the great taste of lemon-lime.', price: 2.50, restaurant_id: 1}),
                knex('items').insert({type: 'BEVERAGES', title: 'Strawberry Banana Smoothie ', description: 'Our Strawberry Banana Smoothie is made fresh when you order and it is the perfect snack to keep you going all day.', price: 3.50, restaurant_id: 1}),
                
                knex('items').insert({type: 'BURGERS', title: 'Bacon King', description: 'Our BACON KING Sandwich features two ¼ lb savory flame-grilled beef patties, topped a with hearty portion of thick-cut smoked bacon, melted American cheese and topped with ketchup and creamy mayonnaise all on a soft sesame seed bun.', price: 6.25, restaurant_id: 1}),
                knex('items').insert({type: 'BURGERS', title: 'Single Stacker', description: 'Single Stacker boasts a flame-grilled beef patty, melted cheese and crispy bacon.', price: 5.99, restaurant_id: 1}),
                knex('items').insert({type: 'BURGERS', title: 'Hamburger', description: 'Try our Hamburger, a signature flame-grilled beef patty topped with a simple layer of crunchy pickles, yellow mustard, and ketchup on a toasted sesame seed bun.', price: 6.50, restaurant_id: 1}),

                knex('items').insert({type: 'DESSERTS', title: 'New York Style Cheesecake', description: 'Our delicious New York Style Cheesecake is served on a thick, buttery Graham cracker crust. One mouth-watering bite and you’ll be back for more.', price: 3.00, restaurant_id: 1}),
                knex('items').insert({type: 'DESSERTS', title: 'Soft Serve Cone', description: 'We didn’t invent soft serve, but with one taste of our cool, creamy, and velvety Vanilla Soft Serve, you’ll think we perfected it. Your choice of classic cone or cup.', price: 2.00, restaurant_id: 1}),
                knex('items').insert({type: 'DESSERTS', title: 'Caramel Sundae', description: 'Cool and creamy, our made-to-order Caramel Sundae is prepared with our velvety Vanilla Soft Serve and finished with a delicious caramel swirl.', price: 3.45, restaurant_id: 1}),

                knex('items').insert({type: 'PANCAKES', title: 'Red Velvet Pancakes', description: 'Red Velvet isn\'t just for dessert anymore. These decadent pancakes are delicious with mascarpone spread and some maple syrup.', price: 4.45, restaurant_id: 1}),
                knex('items').insert({type: 'PANCAKES', title: 'Fluffy Pancakes', description: 'These pancakes are a breakfast and brunch favorite that you cannot resist.', price: 4.45, restaurant_id: 1}),
                knex('items').insert({type: 'PANCAKES', title: 'Baked Pancakes', description: 'Perfect, easy breakfast.', price: 4.45, restaurant_id: 1}),
                knex('items').insert({type: 'PANCAKES', title: 'Mom\'s Buttermilk Pancakes', description: 'These pancakes are passed down from my grandmother, who was fully Scandinavian. They are light and fluffy, and great with berry syrups.', price: 4.45, restaurant_id: 1}),

                knex('items').insert({type: 'APPETIZER', title: 'Outrageous Warm Chicken Nacho Dip', description: 'This is a serious crowd-pleaser that is served hot as a dip, spooned over crisp tortilla chips nacho-style, or rolled up in a warm flour tortilla!', price: 2.50, restaurant_id: 1}),
                knex('items').insert({type: 'APPETIZER', title: 'Big Ray\'s Mexican Monkey Bread', description: 'WOW it is delicious.', price: 2.50, restaurant_id: 1})
              ]);
            })
        ]);
      })
  ]);
};
