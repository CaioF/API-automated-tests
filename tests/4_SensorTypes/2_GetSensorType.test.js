'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
var SensorType_ID;

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .get(`/GetSensorType?ID=${SensorType_ID}`)
}

// GET /api/v1/GetSensorType
describe('Returns an SensorType by ID', () => {

  it('returns 200 when the specified SensorType ID is in the DB', (done) => {
    SensorType_ID = 1;
    api()
    .expectStatus(200)
    .expectValue('sensorType.ID', 1)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw err
      } else {
          done()
      }
    })
  });

  it('returns 404 when the specified SensorType ID is not in the DB', (done) => {
    SensorType_ID = 99;
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
    SensorType_ID = 'a';
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
    SensorType_ID = null;
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