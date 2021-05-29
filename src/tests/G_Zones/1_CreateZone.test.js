'use strict'

const hippie = require('hippie');
const util = require('../../util');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');
const base64 = require('../../base64.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .post(`/CreateZone`)
}

describe('POST /CreateZone\nCreates  a Zone and returns that Zone', () => {

  it('returns 200 when the request body params match the specification', (done) => {
    api()
    .send({
      "title": "zone_1",
      "description": "zone_1",
      "permissions": {
        "allowedEmployees": [
          createdIDs.employee
        ]
      },
      "path": {
        "geojson": base64.geojson
      }
    })
    .expectStatus(200)
    .expectValue('zone.title', 'zone_1')
    .expectValue('zone.allowedEmployees[0].employee.ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.zone = body.zone.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "title": "zone_2",
      "description": null,
      "permissions": {
        "allowedEmployees": [
          createdIDs.employee
        ]
      },
      "path": {
        "geojson": base64.geojson
      }
    })
    .expectStatus(200)
    .expectValue('zone.title', 'zone_2')
    .expectValue('zone.allowedEmployees[0].employee.ID', createdIDs.employee)
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
      "permissions": {
        "allowedEmployees": [
          createdIDs.employee
        ]
      },
      "path": {
        "geojson": base64.geojson
      }
    })
    .expectStatus(400)
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
      "description": "zone_3",
      "permissions": null,
      "path": null
    })
    .expectStatus(400)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified Allowed Employee IDs are not in the DB', (done) => {
    api()
    .send({
      "title": "zone_3",
      "description": "zone_3",
      "permissions": {
        "allowedEmployees": [
          createdIDs.employee+99
        ]
      },
      "path": {
        "geojson": base64.geojson
      }
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