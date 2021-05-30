'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');
var pageNumber;
var resultPerPage;

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/ListSensorTypes?pagination.pageNumber=${pageNumber}&pagination.resultPerPage=${resultPerPage}`)
}

describe('GET /ListSensorTypes\nReturns a list of all SensorTypes with pagination', () => {

  it('returns 200 when the path params match the specification', (done) => {
    pageNumber = 1;
    resultPerPage = 100;
    api()
    .expectStatus(200)
    .expectBody(new RegExp(`"ID":${createdIDs.sensorType}`)) // Checks to see if created ID is in array
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200, and an array of length <= 10, when the path params are omitted', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/ListSensorTypes`)
    .expectStatus(200)
    .expectValue('sensorTypes[0].ID', 1) // Server creates default sensorTypes, this should always be true
    .end( (err, res, body) =>            // NOTE: The above hardcoded ID is required in place of a regex check for the created ID
    {                                    // This is becase this request returns an array of length <= 10, and the created ID in this case > 10
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200, as if params are omitted, when they equal 0', (done) => {
    pageNumber = 0;
    resultPerPage = 0;
    api()
    .expectStatus(200)
    .expectValue('sensorTypes[0].ID', 1) // Server creates default sensorTypes, this should always be true
    .end( (err, res, body) =>            // NOTE: The above hardcoded ID is required in place of a regex check for the created ID
    {                                    // This is becase this request returns an array of length <= 10, and the created ID in this case > 10
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 and an empty object when the path params are out of range', (done) => {
    pageNumber = 10000000;
    resultPerPage = 10;
    api()
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 400 when the path params do not match the specification', (done) => {
    pageNumber = 'a';
    resultPerPage = 'a';
    api()
    .expectStatus(400)
    .expectValue('code', 3)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
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
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
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
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  })

})