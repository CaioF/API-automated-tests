'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateDevice`)
}

// PUT /api/v1/UpdateDevice
describe('Update an Device by ID and returns that Device ', () => {

  it('returns 200 when the request body params do match the swagger specification', (done) => {
    api()
    .send({
      "ID": 2,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9",
      "loadInfo": {
        "loadSensors": true
      }
    })
    .expectStatus(200)
    .expectValue('device.employee.person.email', 'ivanxxx3@mail.com')
    .expectKey('device.sensors[0]')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Device was truly updated', (done) => {
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/GetDevice?ID=2`)
    .expectStatus(200)
    .expectValue('device.employee.person.email', 'ivanxxx3@mail.com')
    .expectKey('device.sensors[0]')
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
      "ID": 2,
      "title": null,
      "description": null,
      "physicalID": null,
      "type": null,
      "employeeID": 3,
      "data": null,
      "loadInfo": {
        "loadSensors": true
      }
    })
    .expectStatus(200)
    .expectValue('device.employee.person.email', 'ivanxxx3@mail.com')
    .expectValue('device.title', 'up_device_2_title')
    .expectValue('device.description', 'up_device_2_description')
    .expectValue('device.physicalID', 'up_device_2_ID')
    .expectKey('device.sensors[0]')
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
      "ID": 2,
      "title": "a",
      "description": "a",
      "physicalID": "a",
      "type": "a",
      "employeeID": 3,
      "data": "a",
      "loadInfo": {
        "loadSensors": true
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

  it('returns 404 when the specified Device ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 99,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9",
      "loadInfo": {
        "loadSensors": true
      }
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

  it('returns 404 when the specified Employee ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 2,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 99,
      "data": "eyAia2V5IjogInZhbHVlIiB9",
      "loadInfo": {
        "loadSensors": true
      }
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

  it('returns 409 when the specified Employee ID is already attached to another Device', (done) => {
    api()
    .send({
      "ID": 2,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 1,
      "data": "eyAia2V5IjogInZhbHVlIiB9",
      "loadInfo": {
        "loadSensors": true
      }
    })
    .expectStatus(409)
    .expectValue('code', 6)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 409 when the specified Physical ID is already attached to another Device', (done) => {
    api()
    .send({
      "ID": 2,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "device_1_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9",
      "loadInfo": {
        "loadSensors": true
      }
    })
    .expectStatus(409)
    .expectValue('code', 6)
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