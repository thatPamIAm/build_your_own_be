exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('merchants', function(table) {
      table.increments('id').primary();
      table.string('merchant_name');
      table.integer('merchant_id').unique();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('products', function(table) {
      table.increments('id').primary();
      table.string('product_keyword');
      table.integer('merchant_id').unsigned();
      table.foreign('merchant_id')
        .references('merchants.merchant_id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products'),
    knex.schema.dropTable('merchants')
  ]);
};
