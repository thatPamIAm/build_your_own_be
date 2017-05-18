'use strict';
var merchants = require('../../../merchants')
var products = require('../../../products')

exports.seed = function(knex, Promise) {
  return knex('products').del()
    .then(() => {
      return knex('merchants').del()
        .then(() => {
          return knex('merchants').insert(merchants)
          .then(() => {
            var productPromises = [];
            products.forEach((product) => {
              let merchant = product.merchant;
              productPromises.push(createProduct(knex, product, merchant))
            });
            return Promise.all(productPromises)
          });
        });
    });
};

const createProduct = (knex, product, merchant) => {
  return knex('merchants').where('merchant_id', merchant).first()
  .then((merchantRecord) => {
    return knex('products').insert({
      product_keyword: product.product_keyword,
      merchant: product.merchant
    })
  });
};
