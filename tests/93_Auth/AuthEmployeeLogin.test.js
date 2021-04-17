'use strict'

const hippie = require('hippie');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .post(`/AuthEmployeeLogin`)  
}

// POST /api/v1/AuthEmployeeLogin
describe('should login an Employee', () => {

  it('returns 200 when the request body params match the DB entry', (done) => {
    api()
    .send({
        "email": "ivanxxx@mail.com",
        "password": "ivanxxx123",
        "devicePhysicalID": "device_1_ID"
      })
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`);
      } else {
          done()
      }
    })
  })

})