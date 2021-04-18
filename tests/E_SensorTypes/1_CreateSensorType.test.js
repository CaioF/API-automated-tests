'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateSensorType`)
}

// POST /api/v1/CreateSensorType
describe('Creates a Sensor Type and returns that Sensor Type', () => {

  it('returns 200 when the request body params match the specification', (done) => {
    api()
    .send({
      "title": "sensor_type_1",
      "description": "string",
      "slug": "sensor_type_1",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_INT32"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "title": "sensor_type_2",
      "description": null,
      "slug": "sensor_type_2",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_INT32"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_2')
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
      "title": "a",
      "description": "a",
      "slug": "a",
      "graphType": "a",
      "dataType": "a"
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
      "title": null,
      "description": null,
      "slug": null,
      "graphType": null,
      "dataType": null
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