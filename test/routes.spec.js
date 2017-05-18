// process.env.NODE_ENV = 'test';

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const configuration = require('../knexfile')['test']
const database      = require('knex')(configuration)
chai.use(chaiHttp)

describe('API Routes', () => {
//describe('GET /api/v1/folders', (request, response) => {
//       it('should return all of the folders', (done) => {
//         chai.request(server)
//         .get('/api/v1/folders')
//         .end((err, response) => {
//           response.should.have.status(200)
//           response.should.be.json
//           response.body.should.be.a('array')
//           response.body.length.should.equal(2)
//           response.body[0].should.have.property('folder_name')
//           response.body[0].folder_name.should.equal('really cool folder')
//           response.body[1].should.have.property('folder_name')
//           response.body[1].folder_name.should.equal('another chic folder')
//
//           done()
//         })
//       })
//
//       it('should return a 404 error for non-existent routes', (done) => {
//         chai.request(server)
//         .get('/api/v1/sadfolders')
//         .end((err, response) => {
//           response.should.have.status(404)
//
//           done()
//         })
//       })
//     })
})
