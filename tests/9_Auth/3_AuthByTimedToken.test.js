'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/AuthByTimedToken`)  
}

// FIXME: This errors out with 500, read more at: 
// https://docs.google.com/spreadsheets/d/17hh7UODqE6ab2o93NhpY_IglIwGZ4VBC39dRmwiyji0/edit?usp=sharing

//POST /api/v1/AuthByTimedToken
describe('should authorize an employee via the generated timed token from the QR code', () => {

  it('returns 200 when the request body params match the DB entry', (done) => {
    api()
    .send({
        "token": "fAWnFGKUwRmRX2B9e7DPTywM3XRvjeWcfysJ"
      })
    .expectStatus(200)
    // .expectValue()
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