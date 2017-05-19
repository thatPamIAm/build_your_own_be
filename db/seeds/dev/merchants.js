const merchants = require('../../../merchants');
const products = require('../../../products');

const createProduct = (knex, product, merchant) => {
  return knex('merchants').where('merchant_id', merchant).first()
  .then((merchantRecord) => {
    return knex('products').insert({
      product_keyword: product.product_keyword,
      merchant: product.merchant
    });
  });
};

exports.seed = function (knex, Promise) {
  return knex('products').del()
    .then(() => {
      return knex('merchants').del()
        .then(() => {
          return knex('merchants').insert(merchants)
          .then(() => {
            const productPromises = [];
            products.forEach((product) => {
              const merchant = product.merchant;
              productPromises.push(createProduct(knex, product, merchant));
            });
            return Promise.all(productPromises);
          });
        });
    });
};
