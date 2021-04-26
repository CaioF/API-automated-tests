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
    .put(`/UpdateManager`)
}

describe('PUT /UpdateManager\nUpdate a Manager by ID and returns that Manager ', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": 2,
      "description": "up_manager_2",
      "person": {
        "firstName": "up_manager_2",
        "lastName": "up_manager_2",
        "image": base64.image,
        "email": "up_manager_2@mail.com",
        "phone": "up_string"
      },
      "credentials": {
        "password": "manager_2_123"
      },
      "capabilities": {
        "viewSingle": [
          "a"
        ],
        "viewSeveral": [
          "a"
        ],
        "editSingle": [
          "a"
        ],
        "editSeveral": [
          "a"
        ],
        "create": [
          "a"
        ],
        "delete": [
          "a"
        ]
      }
    })
    .expectStatus(200)
    .expectValue('manager.person.email', 'up_manager_2@mail.com')
    .expectValue('manager.credentials.password', '')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Manager was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetManager?ID=2`)
    .expectStatus(200)
    .expectValue('manager.person.email', 'up_manager_2@mail.com')
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
      "description": null,
      "person": null,
      "credentials": null,
      "capabilities": null,
    })
    .expectStatus(200)
    .expectValue('manager.description', 'up_manager_2')
    .expectValue('manager.person.email', 'up_manager_2@mail.com')
    .expectValue('manager.person.firstName', 'up_manager_2')
    .expectValue('manager.person.lastName', 'up_manager_2')
    .expectValue('manager.person.phone', 'up_string')
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
      "description": 'a',
      "person": 'a',
      "credentials": 'a',
      "capabilities": 'a',
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

  it('returns 404 when the specified Manager ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 99,
      "description": null,
      "person": null,
      "credentials": null,
      "capabilities": null,
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