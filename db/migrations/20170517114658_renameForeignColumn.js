
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('products', function(table) {
      table.renameColumn('merchant_id', 'merchant');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('products', function(table) {
      table.renameColumn('merchant', 'merchant_id');
    })
  ])
};
