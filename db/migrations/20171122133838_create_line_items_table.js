
exports.up = function(knex, Promise) {
  return knex.schema.createTable('line_items', function (table) {
    table.increments();
    table.integer('quantity');
    table.float('price_per_unit',8 ,2);
    table.integer('order_id');
    table.integer('item_id');

    table.foreign('order_id').references('orders.id');
    table.foreign('item_id').references('items.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('line_items');
};
