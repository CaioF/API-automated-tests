'use strict'

const hippie = require('hippie');
const util = require('../../util');
const tokens = require('../../tokens.json');
const config = require('../../config.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .post(`/AuthEmployeeLogin`)  
}

describe('POST /AuthEmployeeLogin\nShould login an Employee', () => {

  it('returns 200 when the request body params match the DB entry', (done) => {
    api()
    .send({
        "email": "ivanxxx@mail.com",
        "password": "ivanxxx123",
        "devicePhysicalID": "device_1_ID"
      })
    .expectStatus(200)
    .expectKey('token')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`);
      } else {
        tokens.employeeToken = body.token;
        util.updateTokens(tokens);
        done()
      }
    })
  });
  
  it('returns 401 when the request body params do not match the DB entry', (done) => {
    api()
    .send({
        "email": "wrongivanxxx@mail.com",
        "password": "wrongivanxxx123",
        "devicePhysicalID": "device_1_ID"
      })
    .expectStatus(401)
    .expectValue('code', 16)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`);
      } else {
        done()
      }
    })
  });

  it('returns 401 when the specified Device Physical ID is incorrect', (done) => {
    api()
    .send({
        "email": "ivanxxx@mail.com",
        "password": "ivanxxx123",
        "devicePhysicalID": "device_99_ID"
      })
    .expectStatus(401)
    .expectValue('code', 16)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`);
      } else {
        done()
      }
    })
  });
  
  it('returns 400 when the request body params are null', (done) => {
    api()
    .send({
        "email": null,
        "password": null,
        "devicePhysicalID": null
      })
    .expectStatus(400)
    .expectValue('code', 3)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`);
      } else {
        done()
      }
    })
  }) 

})