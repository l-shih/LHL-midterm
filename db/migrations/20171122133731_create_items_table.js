
exports.up = function(knex, Promise) {
    return knex.schema.createTable('items', function (table) {
      table.increments();
      table.string('type');
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.float('price', 8, 2).notNullable();

      table.integer('restaurant_id');
      table.foreign('restaurant_id').references('restaurants.id');
      });
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items');
  };

