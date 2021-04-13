'use strict'

const hippie = require('hippie');
const tokens = require('../../log/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateIncident`)
}

// POST /api/v1/CreateIncident
describe('Creates an Incident and returns that Incident', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 1,
      "reason": "reason_1",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "description": null,
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 1,
      "reason": "reason_2",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the swagger specification', (done) => {
    api()
    .send({
      "description": "a",
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 1,
      "reason": "a",
      "status": "a"
    })
    .expectStatus(400)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the required request body params are null', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 1,
      "reason": null,
      "status": null,
    })
    .expectStatus(400)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Employee ID is not in the DB', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 99, // FIXME: 202 answer despite out of range ID, is this acceptable?
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 1,
      "reason": "reason_3",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(404)
    .end( (err, res, body) =>
    {  
      if (err) {
        console.error(body); 
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Device ID is not in the DB', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 1,
      "deviceID": 99, // FIXME: 202 answer despite out of range ID, is this acceptable?
      "sensorID": 1,
      "initialZone": 1,
      "reason": "reason_3",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(404)
    .end( (err, res, body) =>
    {  
      if (err) {
        console.error(body); 
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Sensor ID is not in the DB', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 99, // FIXME: 202 answer despite out of range ID, is this acceptable?
      "initialZone": 1,
      "reason": "reason_3",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(404)
    .end( (err, res, body) =>
    {  
      if (err) {
        console.error(body); 
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Initial Zone ID is not in the DB', (done) => {
    api()
    .send({
      "description": "description",
      "employeeID": 1,
      "deviceID": 1,
      "sensorID": 1,
      "initialZone": 99, // FIXME: 202 answer despite out of range ID, is this acceptable?
      "reason": "reason_3",
      "status": "INCIDENT_STATUS_RESOLVED"
    })
    .expectStatus(404)
    .end( (err, res, body) =>
    {  
      if (err) {
        console.error(body); 
        throw err
      } else {
          done()
      }
    })
  })

})