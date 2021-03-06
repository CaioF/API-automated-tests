'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.employeeToken)
    .post(`/CreateMetrics`)
}

describe('POST /CreateMetrics\nCreates a Sensor Metric', () => {

  it('returns 200 when the request body params match the specification', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "magnetic": {
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

  it('check to see if Sensor of type "fall_detection" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "fall_detection": {
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

  it('check to see if Sensor of type "altitude" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "altitude": {
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

  it('check to see if Sensor of type "longitude" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "altitude": {
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

  it('check to see if Sensor of type "latitude" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "altitude": {
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

  it('check to see if Sensor of type "signal_sim_2" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "signal_sim_2": {
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

  it('check to see if Sensor of type "signal_sim_1" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "signal_sim_1": {
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

  it('check to see if Sensor of type "smartphone_battery" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "smartphone_battery": {
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

  it('check to see if Sensor of type "pressure" returns 200 correctly', (done) => {
    api()
    .send({
      "ts": "2021-04-03T12:20:27.330Z",
      "data": {
        "pressure": {
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

  it('returns 400 when the request body params do not match the specification', (done) => {
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