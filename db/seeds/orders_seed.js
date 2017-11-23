exports.seed = function(knex, Promise) {
    return Promise.all([
        //Knex for users table
        knex('users').insert({first_name: 'Alice', last_name: 'Murphy', phone: '7783895509'}),
        knex('users').insert({first_name: 'Charlie', last_name: 'Lankaster', phone: '889383899'})
        .returning('id')
        .then((id)=>{
          return knex('orders').insert([
            //Knex for resources table
            //{url: 'https://www.vegas.com/gaming/gaming-tips/sports-betting/', title: 'Your #1 resource for sports-betting', description: 'In-depth to all your sports-betting needs', user_id: id[0]}
            {
              total_price: '35.00',
              paid_at: '2017-11-22 18:40:00',
              ready_at: '2017-11-22 19:00:00', 
              est_ready_time: '00:20:00',
              user_id: id[0]
            }
          ])
        })
      ])
};