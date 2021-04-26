'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');
var pageNumber;
var resultPerPage;

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/ListDevices?pagination.pageNumber=${pageNumber}&pagination.resultPerPage=${resultPerPage}`)
}

describe('GET /ListDevices\nReturns a list of all Devices with pagination', () => {

  it('returns 200 when the path params match the specification', (done) => {
    pageNumber = 2;
    resultPerPage = 1;
    api()
    .expectStatus(200)
    .expectValue('devices[0].ID', 2)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 when the path params are omitted', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/ListDevices`)
    .expectStatus(200)
    .expectValue('devices[0].ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 with additional sensor data when the load params are specified', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/ListDevices?pagination.pageNumber=0&pagination.resultPerPage=1&loadInfo.loadAttributes=true&loadInfo.loadSensors=true&loadInfo.loadSensorsValues=true`)
    .expectStatus(200)
    .expectValue('devices[0].ID', 1)
    .expectKey('devices[0].sensors[0]')
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