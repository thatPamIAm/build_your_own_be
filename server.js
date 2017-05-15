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

app.get('/account', function(request, response) {
  request({
    uri: 'https://rest.viglink.com/api',
    headers: 

  })
})

//rest.viglink.com/api/metrics?startDate=2016-01-01&endDate=2016-01-31'

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
