exports.seed = function (knex, Promise) {
  return knex('products').del()
    .then(() => knex('merchants').del())
    .then(() => {
      return Promise.all([
        knex('merchants').insert({
          id: 1, merchant_name: 'Foleys', merchant_id: '222222'
        }, 'merchant_id')
        .then(merchant => {
          return knex('products').insert([
            {
              id: 1,
              product_keyword: 'Some really cool boots',
              merchant: merchant[0]
            },
            {
              id: 2,
              product_keyword: 'Some sweet jacket',
              merchant: merchant[0]
            }
          ]);
        }),
        knex('merchants').insert({
          id: 2, merchant_name: 'Walmart', merchant_id: '111111'
        }, 'merchant_id')
        .then(merchant => {
          return knex('products').insert([
            {
              id: 3,
              product_keyword: 'red t-shirt',
              merchant: merchant[0]
            },
            {
              id: 4,
              product_keyword: 'blue baseball cap',
              merchant: merchant[0]
            }
          ]);
        }),
      ]); // end return Promise.all
    });
};
