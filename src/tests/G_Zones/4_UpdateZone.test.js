'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');
const base64 = require('../../base64.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateZone`)
}

describe('PUT /UpdateZone\nUpdate a Zone by ID and returns that Zone', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": 2,
      "title": "up_zone_2",
      "description": "up_zone_2",
      "permissions": {
        "allowedEmployees": [
          1, 3
        ]
      },
      "path": {
        "geojson": base64.geojson
      }
    })
    .expectStatus(200)
    .expectValue('zone.title', 'up_zone_2')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Zone was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetZone?ID=2`)
    .expectStatus(200)
    .expectValue('zone.title', 'up_zone_2')
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
      "ID": 2,
      "title": null,
      "description": null,
      "permissions": null,
      "path": null
    })
    .expectStatus(200)
    .expectValue('zone.description', 'up_zone_2')
    .expectValue('zone.title', 'up_zone_2')
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
      "ID": 2,
      "title": 'a',
      "description": 'a',
      "permissions": 'a',
      "path": 'a'
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

  it('returns 404 when the specified Zone ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 99,
      "title": null,
      "description": null,
      "permissions": null,
      "path": null
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