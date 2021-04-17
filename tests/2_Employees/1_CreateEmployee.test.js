'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
const base64 = require('../data_files/base64.json');

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
    .expectValue('employee.person.email', 'ivanxxx@mail.com')
    .expectValue('employee.credentials.password', '')
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
        console.error(body);
        throw err
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
        console.error(body);
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
    .expectValue('code', 3)
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
        console.error(body);
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
    .expectValue('code', 5)
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