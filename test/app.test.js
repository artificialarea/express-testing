// const { expect } = require('chai');
// const expect = require('chai').expect; 
// ^^^^ why isn't expect recognized, and why does this supertest work without it?
const supertest = require('supertest');
const app = require('../app');


describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });
});