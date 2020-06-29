// const { expect } = require('chai');
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /midpoint endpoint', () => {

  it('should find the midpoint between NY and LA', () => {
  
    // insert data
    const query = {
      lat1: 40.6976701,   // NY
      lon1: -74.2598674,  // NY
      lat2: 34.0207305,   // LA
      lon2: -118.6919221  // LA
    };

    // expect
    // somewhere near Aurora, Kansas
    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972
    };

    // assert (actual === expected)
    return supertest(app)
      .get('/midpoint')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys('lat', 'lon');
        expect(res.body).to.eql(expected)
      });
  })

  // other tests? 
  // that lat + lon... exist and are not empty
  // that lat + lon... are numbers (and parseFloat'd)
  // that lat + lon... have decimals
  // that lat + lon... have appropriate numerical decimal length?

});


