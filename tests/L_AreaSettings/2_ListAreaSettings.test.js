'use strict'

const hippie = require('hippie');
const tokens = require('../tokens.json');

var section;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/ListAreaSettings?section=${section}`)
}

// GET /api/v1/ListAreaSettings
describe('Returns a list of all Area Settings with pagination', () => {

  it('returns 200 when the path params match the specification', (done) => {
    section = 'devices_1';
    api()
    .expectStatus(200)
    .expectValue('settings[0].key', 'devices_1')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 and an empty array when the path params do not match the specification', (done) => {
    section = 1;
    api()
    .expectStatus(200)
    .expectValue('settings', [])
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 and an empty array when the path params are null', (done) => {
    section = null;
    api()
    .expectStatus(200)
    .expectValue('settings', [])
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