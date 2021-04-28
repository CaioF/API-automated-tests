'use strict'

const hippie = require('hippie');
const util = require('../../util')
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .post(`/CreateSensorType`)
}

describe('POST /CreateSensorType\nCreates a Sensor Type and returns that Sensor Type', () => {

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
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
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

  it('check that the enum DATA_TYPE_INT64 returns 200 correctly', (done) => {
    api()
    .send({
      "title": "sensor_type_3",
      "description": "string",
      "slug": "sensor_type_3",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_INT64"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_3')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('check that the enum DATA_TYPE_FLOAT returns 200 correctly', (done) => {
    api()
    .send({
      "title": "sensor_type_4",
      "description": "string",
      "slug": "sensor_type_4",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_FLOAT"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_4')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('check that the enum DATA_TYPE_DOUBLE returns 200 correctly', (done) => {
    api()
    .send({
      "title": "sensor_type_5",
      "description": "string",
      "slug": "sensor_type_5",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_DOUBLE"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_5')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('check that the enum DATA_TYPE_STRING returns 200 correctly', (done) => {
    api()
    .send({
      "title": "sensor_type_6",
      "description": "string",
      "slug": "sensor_type_6",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_STRING"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_6')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('check that the enum DATA_TYPE_BOOL returns 200 correctly', (done) => {
    api()
    .send({
      "title": "sensor_type_7",
      "description": "string",
      "slug": "sensor_type_7",
      "graphType": "GRAPH_TYPE_LINE",
      "dataType": "DATA_TYPE_BOOL"
    })
    .expectStatus(200)
    .expectValue('sensorType.slug', 'sensor_type_7')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.sensorType = body.sensorType.ID;
          util.updateCreatedIDs(createdIDs);
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