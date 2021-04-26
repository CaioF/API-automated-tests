'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateSensor`)
}

describe('PUT /UpdateSensor\nUpdate a Sensor by ID and returns that Sensor', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": 1,
      "title": "UP Smartphone battery",
      "description": "UP Smartphone battery",
      "graph": "GRAPH_TYPE_NUMBER"
    })
    .expectStatus(200)
    .expectValue('sensor.title', 'UP Smartphone battery')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Sensor was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetSensor?ID=1`)
    .expectStatus(200)
    .expectValue('sensor.title', 'UP Smartphone battery')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "ID": 1,
      "title": null,
      "description": null,
      "graph": "GRAPH_TYPE_NUMBER"
    })
    .expectStatus(200)
    .expectValue('sensor.description', 'UP Smartphone battery')
    .expectValue('sensor.title', 'UP Smartphone battery')
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
      "ID": 1,
      "title": 'a',
      "description": 'a',
      "graph": 'a'
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

  it('returns 404 when the specified Sensor ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 99,
      "title": null,
      "description": null,
      "graph": "GRAPH_TYPE_NUMBER"
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