exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("orders", function (table) {
      table.increments(); // order_id; primary key!
      table.integer("order_id");
      table.foreign("order_id").references("users.id"); // Foreign key.
      table.varchar("total_price") // total price of order.
      table.timestamp("paid_at") // nullable time stamp with a time stamp
                                 // input when order has been paid.
      table.timestamp("ready_at") // nullable time stamp with a time 
                                  // stamp assigned when the order is ready.
      table.varchar("est_ready_time") // nullable column with a time stamp
                                      // input when the order is ready!
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("orders")
  ])
};