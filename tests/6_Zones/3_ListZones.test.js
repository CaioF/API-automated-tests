'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
var pageNumber;
var resultPerPage;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListZones?pagination.pageNumber=${pageNumber}&pagination.resultPerPage=${resultPerPage}`)
}

// GET /api/v1/ListZones
describe('Returns a list of all Zones with pagination', () => {

  it('returns 200 when the path params do match the swagger specification', (done) => {
    pageNumber = 2;
    resultPerPage = 1;
    api()
    .expectStatus(200)
    .expectValue('zones[0].ID', 2)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 200 when the path params are omitted', (done) => {
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListZones`)
    .expectStatus(200)
    .expectValue('zones[0].ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the path params do not match the swagger specification', (done) => {
    pageNumber = 'a';
    resultPerPage = 'a';
    api()
    .expectStatus(400)
    .expectValue('code', 3)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the pagination is incorrectly omitted from the path params', (done) => {
    pageNumber = '';
    resultPerPage = '';
    api()
    .expectStatus(400)
    .expectValue('code', 3)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the path params are null', (done) => {
    pageNumber = null;
    resultPerPage = null;
    api()
    .expectStatus(400)
    .expectValue('code', 3)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  })

})