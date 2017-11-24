exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('restaurants').del()
      .then(function () {
        return Promise.all([
          knex('restaurants').insert({name: 'Lighthoust Pub', phone: '+1888-569-6898', street: '128 W Hastings St #300', city: 'vancouver', province: 'BC', postal_code: 'V6B 1G8'}),
          knex('restaurants').insert({name: 'Fake Res One', phone: '+1222-333-4444', street: 'Fake Street', city: 'Fake city', province: 'Fake province', postal_code: 'Fake code'}),
        ]);
      })
  ])
};
