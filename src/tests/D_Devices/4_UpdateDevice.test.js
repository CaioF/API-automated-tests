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
    .put(`/UpdateDevice`)
}

describe('PUT /UpdateDevice\nUpdate an Device by ID and returns that Device ', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": createdIDs.device+1,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetDevice?ID=${createdIDs.device+1}`)
    .expectStatus(200)
    .expectValue('device.employee.person.email', 'ivanxxx3@mail.com')
    .expectKey('device.sensors[0]')
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
      "ID": createdIDs.device+1,
      "title": null,
      "description": null,
      "physicalID": null,
      "type": null,
      "employeeID": 3,
      "data": null
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

  it('returns 400 when the request body params do not match the specification', (done) => {
    api()
    .send({
      "ID": createdIDs.device+1,
      "title": "a",
      "description": "a",
      "physicalID": "a",
      "type": "a",
      "employeeID": 3,
      "data": "a"
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

  it('returns 400 when the specified base64 json data is incorrect', (done) => {
    api()
    .send({
      "ID": createdIDs.device+1,
      "title": "device_3_title",
      "description": null,
      "physicalID": "device_3_ID",
      "type": "mobile", // creates a sensor
      "employeeID": createdIDs.employee+3,
      "data": "eyAia2V5IjogInZhbH9"
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
      "ID": createdIDs.device+99,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
      "ID": createdIDs.device+1,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 99,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
      "ID": createdIDs.device+1,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "up_device_2_ID",
      "type": "mobile",
      "employeeID": 1,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
      "ID": createdIDs.device+1,
      "title": "up_device_2_title",
      "description": "up_device_2_description",
      "physicalID": "device_1_ID",
      "type": "mobile",
      "employeeID": 3,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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