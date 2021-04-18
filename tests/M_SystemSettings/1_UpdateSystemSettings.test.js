'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const base64 = require('../base64.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateSystemSettings`)
}

// PUT /api/v1/UpdateSystemSettings
describe('Update an System Settings by ID and returns that System Settings', () => {

  it('returns 200, creating a new System Settings, when the request body params match the specification and the specified Key is not in the DB', (done) => {
    api()
    .send({
      "section": "devices_1",
      "key": "devices_1",
      "settings": 'ewogICAgImtleSI6ICJ2YWx1ZSIKfQ=='
    })
    .expectStatus(200)
    .expectValue('settings.key', 'devices_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the System Settings was truly created', (done) => {
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListSystemSettings?section=devices_1`)
    .expectStatus(200)
    .expectValue('settings[0].key', 'devices_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}`)
      } else {
          done()
      }
    })
  });

  it('returns 200, updating an existing System Settings, when the Section and Key body params match an System Settings in the DB', (done) => {
    api()
    .send({
      "section": "devices_1",
      "key": "devices_1",
      "settings": base64.geojson
    })
    .expectStatus(200)
    .expectValue('settings.key', 'devices_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the System Settings was truly updated', (done) => {
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListSystemSettings?section=devices_1`)
    .expectStatus(200)
    .expectValue('settings[0].key', 'devices_1')
    .expectValue('settings[0].value', 'eyJ0eXBlIjogIlBvbHlnb24iLCAiY29vcmRpbmF0ZXMiOiBbW1stNDkuOTY1ODIwMzEyNSwgNzAuNTY4ODAzMzE3NjMzNDFdLCBbLTM5LjMzMTA1NDY4NzUsIDcwLjU2ODgwMzMxNzYzMzQxXSwgWy0zOS4zMzEwNTQ2ODc1LCA3NC4wNDM3MjI1OTgxMzI1XSwgWy00OS45NjU4MjAzMTI1LCA3NC4wNDM3MjI1OTgxMzI1XSwgWy00OS45NjU4MjAzMTI1LCA3MC41Njg4MDMzMTc2MzM0MV1dXX0=')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}`)
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the specification', (done) => {
    api()
    .send({
      "section": "a",
      "key": "a",
      "settings": 'a'
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