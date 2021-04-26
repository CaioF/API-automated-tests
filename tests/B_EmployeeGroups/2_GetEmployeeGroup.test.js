'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');
var group_ID;

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployeeGroup?ID=${group_ID}`)
}

describe('GET /GetEmployeeGroup\nReturns an Employee Group by ID', () => {

  it('returns 200 when the specified Employee Group ID is in the DB', (done) => {
    group_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'worker')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Employee Group ID is not in the DB', (done) => {
    group_ID = 99;
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
    group_ID = 'a';
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
    group_ID = null;
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