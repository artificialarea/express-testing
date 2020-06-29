const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');


describe('GET / endpoint', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  })
});


describe('GET /quotient endpoint', () => {

  it('8/4 should be 2', () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 8, b: 4 })
      .expect(200, '8 divided by 4 is 2')
  })
  
  it(`should return 400 if 'a' is missing`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ b: 4 })
      .expect(400, 'Value for a is needed');
  })

  it(`should return 400 if 'b' is missing`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4 })
      .expect(400, 'Value for b is needed');
  })

  it(`should return 400 if 'a' is not a number`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 'foo', b: 4 })
      .expect(400, 'Value for a must be numeric');
  })

  it(`should return 400 if 'b' is not a number`, () => {
    return supertest(app)
      .get('/quotient')
      .query({ a: 4, b: 'bar' })
      .expect(400, 'Value for b must be numeric');
  })

});

describe('GET /generate endpoint', () => {

  it('should generate an array of 5', () => {
    return supertest(app)
      .get('/generate')
      .query({ n: 5 })
      .expect(200)
      .expect('Content-Type', /json/ )  // HUH? why only for this endpoint?
      .then( res => {
        // here res is the full response data
        expect(res.body).to.be.an('array');
        // array must not be empty
        expect(res.body).to.have.lengthOf.at.least(1);
        
        // but this assertion fails because array is randomly ordered
        // expect(res.body).to.eql([1,2,3,4,5]);

        // alternatives...

        // vertify that the value 'n' is present in the result
        // without caring about it's position
        expect(res.body).to.include(5)

        // verify all values included
        expect(res.body).to.include.members([1,2,3,4,5]);

        // ^^ the .include() function simply checks that each of the given values is present, but does not care if there are extra values. The .have() function, however, ensures that the values being compared are the only values present...
        expect(res.body).to.have.members([1,2,3,4,5]);
      });
  })
});