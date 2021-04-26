'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');
var Zone_ID;

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetZone?ID=${Zone_ID}`)
}

describe('GET /GetZone\nReturns an Zone by ID', () => {

  it('returns 200 when the specified Zone ID is in the DB', (done) => {
    Zone_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('zone.ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Zone ID is not in the DB', (done) => {
    Zone_ID = 99;
    api()
    .expectStatus(404)
    .expectValue('code', 5)
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
    Zone_ID = 'a';
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
    Zone_ID = null;
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