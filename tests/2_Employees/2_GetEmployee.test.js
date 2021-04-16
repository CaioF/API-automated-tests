'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
var Employee_ID;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/GetEmployee?ID=${Employee_ID}`)
}

// GET /api/v1/GetEmployee
describe('Returns an Employee by ID', () => {

  it('returns 200 when the specified Employee ID is in the DB', (done) => {
    Employee_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('employee.person.email', 'ivanxxx@mail.com')
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
    Employee_ID = 99;
    api()
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
  });

  it('returns 400 when the path params do not match the swagger specification', (done) => {
    Employee_ID = 'a';
    api()
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

  it('returns 400 when the path params are null', (done) => {
    Employee_ID = null;
    api()
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
  })

})