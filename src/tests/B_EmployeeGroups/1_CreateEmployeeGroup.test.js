'use strict'

const hippie = require('hippie');
const tokens = require('../../tokens.json');
const config = require('../../config.json');
const createdIDs = require('../../createdIDs.json');
const util = require ('../../util');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.managerToken)
    .post(`/CreateEmployeeGroup`)
}

describe('POST /CreateEmployeeGroup\nCreates an Employee Group and returns that Employee Group', () => {

  it('returns 200 when the request body params do match the specification', (done) => {
    api()
    .send({
      "title": "group1",
      "description": "group1",
      "slug": "group1"
    })
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'group1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          createdIDs.employeeGroup = body.employeeGroup.ID;
          util.updateCreatedIDs(createdIDs);
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "title": "group2",
      "description": null,
      "slug": "group2"
    })
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'group2')
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
      "title": "a",
      "description": "a",
      "slug": "a"
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
      "title": "group1",
      "description": "group1",
      "slug": "group1"
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
      "title": null,
      "description": "group1",
      "slug": null
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