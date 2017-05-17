const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'BYOB'

app.get('/', (request, response) => {
  response.send('It\'s a BYOB kind of project.')
})

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.get('/api/v1/merchants', (request, response) => {
  database('merchants').select()
    .then(merchants => {
      response.status(200).json(merchants);
    })
    .catch(error => console.error('error: ', error))
  })

app.get('/api/v1/products', (request, response) => {
  database('products').select()
    .then(products => {
      response.status(200).json(products);
    })
    .catch(error => console.error('error: ', error))
})

app.get('/api/v1/merchants/:merchant_id', (request, response) => {
  database('merchants').where('merchant_id', request.params.merchant_id).select()
    .then(folders => {
      response.status(200).json(folders);
    })
    .catch(error => console.error('error: ', error))
});

app.get('/api/v1/products/:id', (request, response) => {
  database('products').where('id', request.params.id).select()
    .then(products => {
      response.status(200).json(products);
    })
    .catch(error => console.error('error: ', error))
})

app.post('/api/v1/merchants', (request, response) => {
  const { merchant_name, merchant_id } = request.body

  database('merchants').insert({merchant_name, merchant_id}, ['merchant_name', 'merchant_id'])
  .then(() => {
    database('merchants').select()
    .then(merchants => { console.log(merchants)
      response.status(201).json(merchants)
    })
  })
})



//app.delete('api/v1/merchants/:id')
//app.delete('/api/v1/products/:id')

//app.patch
//app.put


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
