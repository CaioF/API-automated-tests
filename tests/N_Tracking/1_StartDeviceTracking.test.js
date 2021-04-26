'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');
const config = require('../config.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .header('Authorization', tokens.employeeToken)
    .post(`/StartDeviceTracking`)
}

describe('POST /StartDeviceTracking\nStarts the tracking of a Device via the Employee Token, sent by app during the start of the Tracking', () => {

  it('returns 200 when the path params match the specification', (done) => {
    api()
    .send({})
    .expectStatus(200)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 409 when the specified Device is already being tracked', (done) => {
    api()
    .expectStatus(409)
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