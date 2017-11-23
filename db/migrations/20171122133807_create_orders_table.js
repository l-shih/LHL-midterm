exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", function (table) {
    table.increments();
    table.integer("user_id");
    table.foreign("user_id").references("users.id");
    table.varchar("total_price");
    table.timestamp("paid_at");
    table.timestamp("ready_at");
    table.varchar("est_ready_time");
  });
};

exports.down = function(knex, Promise) {
  return  knex.schema.dropTable("orders");
};