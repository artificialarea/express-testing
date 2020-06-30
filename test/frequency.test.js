const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const { request } = require('../app');


describe('GET /frequency endpoint', () => {

  it.skip ('can\'t be arsed to do any other tests.', () => {
  
  });

  it('should return the correct string count', () => {
    const expected = {
      count: 2,       
      average: 5,     
      highest: 'a',   
      'a': 6,       
      'b': 4
    }

    return supertest(app)
      .get('/frequency')
      .query({ s: 'aaBBAAbbaa' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.include.all.keys('count', 'average', 'highest');
        expect(res.body).to.eql(expected);
      })
  });
})