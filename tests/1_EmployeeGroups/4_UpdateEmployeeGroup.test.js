'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .put(`/UpdateEmployeeGroup`)
}

// PUT /api/v1/UpdateEmployeeGroup
describe('Update an Employee Group by ID and returns that Employee Group', () => {

  it('returns 200 when the request body params do match the swagger specification', (done) => {
    api()
    .send({
      "ID": 3,
      "title": "up_group_1",
      "description": "up_group_1",
      "slug": "up_group_1"
    })
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'up_group_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('check to see if the Employee Group was truly updated', (done) => {
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployeeGroup?ID=3`)
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'up_group_1')
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
      "ID": 3,
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
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the swagger specification', (done) => {
    api()
    .send({
      "ID": 3,
      "title": 'a',
      "description": 'a',
      "slug": 'a'
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
        throw err
      } else {
          done()
      }
    })
  })

})