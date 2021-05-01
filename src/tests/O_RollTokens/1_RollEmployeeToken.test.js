'use strict'

const hippie = require('hippie');
const util = require('../../util');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .del(`/RollEmployeeToken`)
}

describe('DEL /RollEmployeeToken\nDeletes all previous authorization tokens of an Employee by ID', () => {

  it('start Device tracking to check to see if the Employee has a valid Token', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.employeeToken)
    .post(`/StartDeviceTracking`)
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

  it('Stop Device tracking', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.employeeToken)
    .post(`/StopDeviceTracking`)
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

  it('returns 200 when the specified Employee ID is in the DB and is logged in', (done) => {
    api()
    .send({
      "ID": createdIDs.employee
    })
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

  it('check to see if the Employee Token is no longer valid', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.employeeToken)
    .post(`/StartDeviceTracking`)
    .expectStatus(401)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
        done()
      }
    })
  });

  it('get a new token for this Employee', (done) => {
    hippie()
    .json()
    .base(config.url)
    .post(`/AuthEmployeeLogin`)  
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

  it('returns 404 when the specified Employee ID is not in the DB', (done) => {
    api()
    .send({
      "ID": createdIDs.employee+99
    })
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

  it('returns 400 when the request body params do not match the specification', (done) => {
    api()
    .send({
      "ID": 'a'
    })
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

  it('returns 404 when the request body params are null', (done) => {
    api()
    .send({
      "ID": null
    })
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
  })

})