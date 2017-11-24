exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('orders').del()
            .then(function() {
                return Promise.all([
                    knex('orders').insert({total: 10, paid_at: '2017-11-15', ready_at: '2017-11-16', estimated_ready_time: '24:00:00'}),
                    knex('orders').insert({total: 5, paid_at: '2017-11-15', ready_at: '2017-11-15', estimated_ready_time: '00:45:00'}),
                    knex('orders').insert({total: 20, paid_at: '2017-11-18', ready_at: '2017-11-20', estimated_ready_time: '48:00:00'})
                ])
            })
    ]);
};