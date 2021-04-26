'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateEmployeeGroup`)
}

describe('PUT /UpdateEmployeeGroup\nUpdate an Employee Group by ID and returns that Employee Group', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "ID": createdIDs.employeeGroup,
      "title": "up_group_1",
      "description": "up_group_1",
      "slug": "up_group_1"
    })
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'up_group_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('check to see if the Employee Group was truly updated', (done) => {
    hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployeeGroup?ID=${createdIDs.employeeGroup}`)
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'up_group_1')
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
      "ID": createdIDs.employeeGroup,
      "title": null,
      "description": null,
      "slug": null
    })
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'up_group_1')
    .expectValue('employeeGroup.description', 'up_group_1')
    .expectValue('employeeGroup.title', 'up_group_1')
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
      "ID": createdIDs.employeeGroup,
      "title": 'a',
      "description": 'a',
      "slug": 'a'
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

  it('returns 400 when the specified slug is already attached to another Employee Group', (done) => {
    api()
    .send({
      "ID": createdIDs.employeeGroup,
      "title": "up_group1",
      "description": "up_group1",
      "slug": "group2"
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

  it('returns 404 when the specified Employee Group ID is not in the DB', (done) => {
    api()
    .send({
      "ID": 99,
      "title": "up_group_1",
      "description": "up_group_1",
      "slug": "up_group_1"
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