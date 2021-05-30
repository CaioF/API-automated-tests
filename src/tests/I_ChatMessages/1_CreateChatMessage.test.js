'use strict'

const hippie = require('hippie');
const util = require('../../util');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

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
      "employeeID": createdIDs.employee,
      "text": "string"
    })
    .expectStatus(200)
    .expectValue('message.text', 'string')
    .expectValue('message.manager.ID', 1) // Tests are run on the default manager's token - default manager has ID of 1
    .expectValue('message.employee.ID', createdIDs.employee)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.message = body.message.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the specification', (done) => {
    api()
    .send({
      "employeeID": createdIDs.employee,
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
      "employeeID": createdIDs.employee+99,
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