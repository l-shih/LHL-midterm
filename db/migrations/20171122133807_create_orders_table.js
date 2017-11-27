exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("orders", function (table) {
      table.increments();
      table.integer("order_id");
      table.foreign("order_id").references("users.id");
      table.varchar("total_price");
      table.timestamp("paid_at");
      table.timestamp("ready_at");
      table.varchar("est_ready_time");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return  knex.schema.dropTable("orders");
};