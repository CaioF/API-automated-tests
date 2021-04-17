'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
var group_ID;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployeeGroup?ID=${group_ID}`)
}

// GET /api/v1/GetEmployeeGroup
describe('Returns an Employee Group by ID', () => {

  it('returns 200 when the specified Employee Group ID is in the DB', (done) => {
    group_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('employeeGroup.slug', 'worker')
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
    group_ID = 99;
    api()
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
  });

  it('returns 400 when the path params do not match the swagger specification', (done) => {
    group_ID = 'a';
    api()
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

  it('returns 400 when the path params are null', (done) => {
    group_ID = null;
    api()
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
  })

})