exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('restaurants', function (table) {
      table.increments();
      table.string('name').notNullable();
      table.varchar('phone', 20).notNullable();
      table.string('street').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.string('postal_code').notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};