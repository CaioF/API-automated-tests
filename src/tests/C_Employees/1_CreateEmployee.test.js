'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');
const base64 = require('../../base64.json');
const util = require ('../../util');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .post(`/CreateEmployee`)
}

describe('POST /CreateEmployee\nCreates an Employee and returns that Employee and a Token', () => {

  it('returns 200 when the request body params match the specification', (done) => {
    api()
    .send({
      "description": "Ivan Ivanovich",
      "person": {
        "firstName": "Ivan",
        "lastName": "Ivanovich",
        "image": base64.image,
        "email": "ivanxxx@mail.com",
        "phone": "string"
      },
      "credentials": {
        "password": "ivanxxx123"
      },
      "group": 1
    })
    .expectStatus(200)
    .expectValue('employee.person.email', 'ivanxxx@mail.com')
    .expectValue('employee.credentials.password', '')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
        createdIDs.employee = body.employee.ID;
        util.updateCreatedIDs(createdIDs);
        done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "description": null,
      "person": {
        "firstName": "Ivan2",
        "lastName": "Ivanovich2",
        "image": base64.image,
        "email": "ivanxxx2@mail.com",
        "phone": "string"
      },
      "credentials": {
        "password": "ivanxxx2123"
      },
      "group": 1
    })
    .expectStatus(200)
    .expectValue('employee.person.email', 'ivanxxx2@mail.com')
    .expectValue('employee.credentials.password', '')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('create another employee so that the other tests do not fail', (done) => {
    api()
    .send({
      "description": "Ivan Ivanovich 3",
      "person": {
        "firstName": "Ivan3",
        "lastName": "Ivanovich3",
        "image": base64.image,
        "email": "ivanxxx3@mail.com",
        "phone": "string3"
      },
      "credentials": {
        "password": "ivanxxx3123"
      },
      "group": 1
    })
    .expectStatus(200)
    .expectValue('employee.person.email', 'ivanxxx3@mail.com')
    .expectValue('employee.credentials.password', '')
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
      "description": "a",
      "person": {
        "firstName": "a",
        "lastName": "a",
        "image": "a",
        "email": "a",
        "phone": "a"
      },
      "credentials": {
        "password": "a"
      },
      "group": "a"
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

  it('returns 400 when the specified email is already attached to another Employee', (done) => {
    api()
    .send({
      "description": "Ivan Ivanovich",
      "person": {
        "firstName": "Ivan",
        "lastName": "Ivanovich",
        "image": base64.image,
        "email": "ivanxxx@mail.com",
        "phone": "string"
      },
      "credentials": {
        "password": "ivanxxx123"
      },
      "group": 1
    })
    .expectStatus(400)
    .expectValue('code', 9)
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
      "description": null,
      "person": {
        "firstName": null,
        "lastName": null,
        "image": null,
        "email": null,
        "phone": null
      },
      "credentials": {
        "password": null
      },
      "group": null
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

  it('returns 404 when the specified Employee Group ID is not in the DB', (done) => {
    api()
    .send({
      "description": "Ivan Ivanovich 3",
      "person": {
        "firstName": "Ivan3",
        "lastName": "Ivanovich3",
        "image": base64.image,
        "email": "ivanxxx3@mail.com",
        "phone": "string"
      },
      "credentials": {
        "password": "ivanxxx3123"
      },
      "group": 99
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