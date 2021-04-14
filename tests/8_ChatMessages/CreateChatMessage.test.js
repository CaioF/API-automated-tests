'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateChatMessage`)
}

// POST /api/v1/CreateChatMessage
describe('Creates a Chat Message by Employee ID and returns that Chat Message', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
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
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the swagger specification', (done) => {
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
        throw err
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
        throw err
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
        throw err
      } else {
          done()
      }
    })
  })

})