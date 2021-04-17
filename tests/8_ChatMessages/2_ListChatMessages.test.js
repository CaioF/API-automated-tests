'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
var pageNumber;
var resultPerPage;
var employee_ID;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListChatMessages?pagination.pageNumber=${pageNumber}&pagination.resultPerPage=${resultPerPage}&employeeID=${employee_ID}`)
}

// GET /api/v1/ListChatMessages
describe('Returns a list of all ChatMessages with pagination', () => {

  it('returns 200 when the path params do match the swagger specification', (done) => {
    pageNumber = 1;
    resultPerPage = 1;
    employee_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('messages[0].ID', 1)
    .expectValue('messages[0].employee.ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 when the pagination path params are omitted', (done) => {
    employee_ID = 1;
    hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListChatMessages?employeeID=${employee_ID}`)
    .expectStatus(200)
    .expectValue('messages[0].ID', 1)
    .expectValue('messages[0].employee.ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 404 when the Employee ID is not in the DB', (done) => {
    pageNumber = 1;
    resultPerPage = 1;
    employee_ID = 99;
    api()
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

  it('returns 400 when the path params do not match the swagger specification', (done) => {
    pageNumber = 'a';
    resultPerPage = 'a';
    employee_ID = 'a';
    api()
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

  it('returns 400 when the pagination is incorrectly omitted from the path params', (done) => {
    pageNumber = '';
    resultPerPage = '';
    employee_ID = 1;
    api()
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

  it('returns 400 when the path params are null', (done) => {
    pageNumber = null;
    resultPerPage = null;
    employee_ID = 1;
    api()
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