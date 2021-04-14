'use strict'

const hippie = require('hippie');
const tokens = require('../../log/tokens.json');
const base64 = require('../../log/base64.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateEmployee`)
}

// POST /api/v1/CreateEmployee
describe('Creates an Employee and returns that Employee', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
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
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
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
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
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