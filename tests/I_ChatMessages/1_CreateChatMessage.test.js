'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .post(`/CreateChatMessage`)
}

describe('POST /CreateChatMessage\nCreates  a Chat Message by Employee ID and returns that Chat Message', () => {

  it('returns 200 when the request body params match the specification', (done) => {
    api()
    .send({
      "employeeID": 1,
      "text": "string"
    })
    .expectStatus(200)
    .expectValue('message.text', 'string')
    .expectValue('message.manager.ID', 1)
    .expectValue('message.employee.ID', 1)
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
      "employeeID": 1,
      "text": ""
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
      "employeeID": null,
      "text": null
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

  it('returns 404 when the specified Employee ID is not in the DB', (done) => {
    api()
    .send({
      "employeeID": 99,
      "text": "string"
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