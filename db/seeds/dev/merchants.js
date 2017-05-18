'use strict';
var prosperentMerchants = require('../../../merchants')
exports.seed = function(knex, Promise){
  var merchantData = prosperentMerchants.data
  var merchantArray = []
  merchantData.forEach(merchant => {
    merchantArray.push(createMerchant(knex, merchant))
  });
  return Promise.all(merchantData)
};

function createMerchant(knex, merchant) {
  return knex.table('merchants')
    .returning('merchant_id')
    .insert({
      merchant_name: merchant.merchant,
      merchant_id: merchant.merchantId
    })
    .then(function(merchant){
      return knex('products')
        .insert({
            product_keyword: merchant.keyword,
            merchant: merchant[0],
          })
    })
}
