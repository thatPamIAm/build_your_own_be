process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('server side testing', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run();
    })
    .then(() => {
      done();
    });
  });

  afterEach((done) => {
    database.seed.run()
    .then(() => {
      done();
    });
  });

  describe('API Routes', () => {
    describe('GET /api/v1/merchants', (request, response) => {
      it('should return all of the merchants', (done) => {
        chai.request(server)
        .get('/api/v1/merchants')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);

          done();
        });
      });

      it('should return a 404 error for a non-existent merchant route', (done) => {
        chai.request(server)
        .get('/api/v1/merchant')
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('GET /api/v1/products', (request, response) => {
      it('should return all of the products', (done) => {
        chai.request(server)
        .get('/api/v1/products')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);

          done();
        });
      });

      it('should return a 404 error for a non-existent merchant route', (done) => {
        chai.request(server)
        .get('/api/v1/product')
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('GET /api/v1/merchants/:merchant_id', (request, response) => {
      it('should return a single merchant by an ID', (done) => {
        chai.request(server)
        .get('/api/v1/merchants/222222')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('merchant_name');
          response.body[0].merchant_name.should.equal('Foleys');

          done();
        });
      });

      it('should return a 404 error for non-existent routes', (done) => {
        chai.request(server)
        .get('/api/v1/merchant/444444')
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('GET /api/v1/products/:id', (request, response) => {
      it('should return a single product by an ID', (done) => {
        chai.request(server)
        .get('/api/v1/products/1')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('product_keyword');
          response.body[0].product_keyword.should.equal('Some really cool boots');

          done();
        });
      });

      it('should return a 404 error for non-existent routes', (done) => {
        chai.request(server)
        .get('/api/v1/product/6')
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('POST /api/v1/merchants', () => {
      it('should add a merchant to the database', (done) => {
        chai.request(server)
        .post('/api/v1/merchants')
        .send({
          merchant_name: 'Target', merchant_id: 444444
        }, 'merchant_id')
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('array');
          response.body.length.should.equal(3);

          done();
        });
      });

      it('should not allow a post for non-existent routes', (done) => {
        chai.request(server)
        .post('/api/v1/merch')
        .send({
          merchant_name: 'Dollar Store'
        })
        .end((error, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('POST /api/v1/products', () => {
      it('should add a product to the database', (done) => {
        chai.request(server)
        .post('/api/v1/products')
        .send({
          id: 5,
          product_keyword: 'Man Romper',
          merchant: 444444
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('product_keyword');
          response.body[0].product_keyword.should.equal('Man Romper');
          response.body[0].should.have.property('merchant');
          response.body[0].merchant.should.equal(111111);

          done();
        });
      });

      it('should not allow a post for non-existent routes', (done) => {
        chai.request(server)
        .post('/api/v1/prodcts')
        .send({
          product_keyword: 'trendy hipster sunglasses',
          merchant: 123567
        })
        .end((error, response) => {
          response.should.have.status(404);

          done();
        });
      });
    });

    describe('DELETE /api/v1/products/:id', (request, response) => {
      it('should delete a specific product', (done) => {
        chai.request(server)

        .delete('/api/v1/products/4')
        .set('Authorization', process.env.TOKEN)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);

          done();
        });
      });
    });

    describe('DELETE /api/v1/merchants/:merchants_id', (request, response) => {
      it.skip('should delete a merchant and all associated products', (done) => {
        chai.request(server)
        .delete('/api/v1/merchants/111111')
        .set('Authorization', process.env.TOKEN)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);

          done();
        });
      });
    });

    describe('GET /api/v1/merchantName', (request, response) => {
      it('should have a custom endpoint for retrieving merchants by name', (done) => {
        chai.request(server)
        .get('/api/v1/merchantName?merchant_name=Foleys')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('merchant_name');
          response.body[0].merchant_name.should.equal('Foleys');
          response.body[0].should.have.property('merchant_id');
          response.body[0].merchant_id.should.equal(222222);

          done();
        });
      });

      // it('should return a 404 error for a non-existent merchant route', (done) => {
      //   chai.request(server)
      //   .get('/api/v1/merchantName?merchant_name=CircleCIHell')
      //   .end((err, response) => {
      //     response.should.have.status(404);
      //
      //     done();
      //   });
      // });
    });
  });
});
