'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.employeeToken)
    .post(`/CreateMetrics`)
}

// POST /api/v1/CreateMetrics
describe('Creates a Sensor Metric', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "latitude": {
          "bool": true
        }
      }
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

  it('returns 400 when the request body params do not match the swagger specification', (done) => {
    api()
    .send({
      "ts": "a",
      "data": {
        "signal": {
          "bool": true
        }
      }
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

  it('returns 400 when the required request body params are null', (done) => {
    api()
    .send({
      "ts": null,
      "data": null
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

  it('returns 400 when the data key is not a valid Sensor Type Slug', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "a": {
          "bool": true
        }
      }
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

  it('returns 400 when the data key is not a Sensor Type Slug that is attached to the Device', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "heart_rate": {
          "bool": true
        }
      }
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
  })

})