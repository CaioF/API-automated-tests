'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/GenerateAuthQR`)  
}

// POST /api/v1/GenerateAuthQR
describe('should get an QR code', () => {

  it('returns 200 when the request body params match the DB entry', (done) => {
    api()
    .post(`/GenerateAuthQR`)
    .send({
        "employeeID": 1
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