'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateSensorType`)
}

describe('PUT /UpdateSensorType\nUpdate a Sensor Type by ID and returns that Sensor Type', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": createdIDs.sensorType,
      "title": "up_sensor_type_1",
      "description": "up_string",
      "graphType": "GRAPH_TYPE_LINE"
    })
    .expectStatus(200)
    .expectValue('sensorType.title', 'up_sensor_type_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Sensor Type was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetSensorType?ID=${createdIDs.sensorType}`)
    .expectStatus(200)
    .expectValue('sensorType.title', 'up_sensor_type_1')
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
      "ID": createdIDs.sensorType,
      "title": null,
      "description": null,
      "graphType": null
    })
    .expectStatus(200)
    .expectValue('sensorType.description', 'up_string')
    .expectValue('sensorType.title', 'up_sensor_type_1')
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
      "ID": createdIDs.sensorType,
      "title": 'a',
      "description": 'a',
      "graphType": 'a'
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

  it('returns 404 when the specified Sensor Type ID is not in the DB', (done) => {
    api()
    .send({
      "ID": createdIDs.sensorType+99,
      "title": null,
      "description": null,
      "graphType": "GRAPH_TYPE_NUMBER"
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