'use strict'

const hippie = require('hippie');
const fs = require('fs');
const tokens = require('../data_files/tokens.json');

function updateTokens()
{
  fs.writeFile(
    './tests/data_files/tokens.json', 
    JSON.stringify(tokens, null, 2), 
    function writeJSON(err) {if (err) return console.log(err)}
    )
}

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateDevice`)
}

// POST /api/v1/CreateDevice
describe('Creates a Device and returns that Device and a Token', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
    api()
    .send({
      "title": "device_1_title",
      "description": "device_1_description",
      "physicalID": "device_1_ID",
      "type": "device_1",
      "employeeID": 1,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
    })
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          tokens.deviceToken = body.token;
          updateTokens();
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "title": "device_2_title",
      "description": null,
      "physicalID": "device_2_ID",
      "type": "device_2",
      "employeeID": 2,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
      "title": "a",
      "description": "a",
      "physicalID": "a",
      "type": "a",
      "employeeID": 1,
      "data": "a"
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
      "title": null,
      "description": null,
      "physicalID": null,
      "type": null,
      "employeeID": null,
      "data": null
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
      "title": "device_3_title",
      "description": "device_3_description",
      "physicalID": "device_3_ID",
      "type": "device_3",
      "employeeID": 6,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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

  it('returns 400 when the specified Employee ID is already attached to another device', (done) => {
    api()
    .send({
      "title": "device_3_title",
      "description": "device_3_description",
      "physicalID": "device_3_ID",
      "type": "device_3",
      "employeeID": 1,
      "data": "eyAia2V5IjogInZhbHVlIiB9"
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
  })

})