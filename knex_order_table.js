import { Query } from "../../../Library/Caches/typescript/2.6/node_modules/@types/pg";

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("orders", function (table) {
      table.incrmements(); // order_id; primary key!
      table.integer("user_id");  // user_id (from users table).
      table.foreign("users").references("users.user_id"); // Foreign key.
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