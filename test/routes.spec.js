process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test']
const database      = require('knex')(configuration)
chai.use(chaiHttp)

describe('server side testing', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
    })
    .then(() => {
      done()
    })
  })

  afterEach((done) => {
    database.seed.run()
    .then(() => {
      done()
    })
  })

  describe('API Routes', () => {
    describe('GET /api/v1/merchants', (request, response) => {
      it('should return all of the merchants', (done) => {
        chai.request(server)
        .get('/api/v1/merchants')
        .end((err, response) => {
          console.log(response.body)
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('merchant_name')
          response.body[0].merchant_name.should.equal('Foleys')
          response.body[1].should.have.property('merchant_id')
          response.body[1].merchant_id.should.equal(111111)

          done()
        })
      })

      it('should return a 404 error for non-existent routes', (done) => {
        chai.request(server)
        .get('/api/v1/merchant')
        .end((err, response) => {
          response.should.have.status(404)

          done()
        })
      })
    })
  })
})
