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
    .put(`/UpdateEmployee`)
}

describe('PUT /UpdateEmployee\nUpdate an Employee by ID and returns that Employee ', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": createdIDs.employee+1,
      "description": "up_employee_2",
      "person": {
        "firstName": "up_Ivan2",
        "lastName": "up_Ivanovich2",
        "image": base64.image,
        "email": "up_ivanxxx2@mail.com",
        "phone": "up_string"
      },
      "credentials": {
        "password": "up_ivanxxx2123"
      },
      "group": createdIDs.employeeGroup
    })
    .expectStatus(200)
    .expectValue('employee.person.email', 'up_ivanxxx2@mail.com')
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

  it('check to see if the Employee was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployee?ID=${createdIDs.employee+1}`)
    .expectStatus(200)
    .expectValue('employee.person.email', 'up_ivanxxx2@mail.com')
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
      "ID": createdIDs.employee+1,
      "description": null,
      "person": null,
      "credentials": null,
      "group": null
    })
    .expectStatus(200)
    .expectValue('employee.description', 'up_employee_2')
    .expectValue('employee.group.ID', createdIDs.employeeGroup)
    .expectValue('employee.person.email', 'up_ivanxxx2@mail.com')
    .expectValue('employee.person.firstName', 'up_Ivan2')
    .expectValue('employee.person.lastName', 'up_Ivanovich2')
    .expectValue('employee.person.phone', 'up_string')
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
      "ID": createdIDs.employee+1,
      "description": "a",
      "person": {
        "firstName": "a",
        "lastName": "a",
        "image": base64.image,
        "email": "a",
        "phone": "a"
      },
      "credentials": {
        "password": "a"
      },
      "group": 1
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
      "ID": createdIDs.employee+1,
      "description": "up_employee_2",
      "person": {
        "firstName": "up_Ivan2",
        "lastName": "up_Ivanovich2",
        "image": base64.image,
        "email": "ivanxxx@mail.com",
        "phone": "up_string"
      },
      "credentials": {
        "password": "up_ivanxxx2123"
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

  it('returns 404 when the specified Employee ID is not in the DB', (done) => {
    api()
    .send({
      "ID": createdIDs.employee+99,
      "description": "up_employee_2",
      "person": {
        "firstName": "up_Ivan2",
        "lastName": "up_Ivanovich2",
        "image": base64.image,
        "email": "up_ivanxxx2@mail.com",
        "phone": "up_string"
      },
      "credentials": {
        "password": "up_ivanxxx2123"
      },
      "group": 1
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