'use strict'

const hippie = require('hippie');
const base64 = require('./base64.json');
global.managerToken = '';
global.employeeToken = '';
global.deviceToken = '';

// TODO: Add custom swagger parser validator
function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
//     .auth('user', 'pass')
//     .serializer(customSerializer)
//     .parser(customParser)
//     .use(somethingSpecial)
//     .expect(somethingRepeatable);
}

describe('LifeGuard V1 API Test', function () {

  // POST /api/v1/AuthManagerLogin
  describe('Logs in a manager user, returns a token and usertype', () => {
      it('returns 200 when the request body params match the DB entry', (done) => {
        api()
          .post(`/AuthManagerLogin`)
          .send({
              "email": "admin@admin.com",
              "password": "admin123"
            })
          .expectStatus(200)
          .end( (err, res, body) =>
          {  
            if (err) {
              throw err
            } else {
              global.managerToken = body.token;
              done()
            }
          })
      });
      it('returns 401 when the request body params do not match the DB entry', (done) => {
        api()
        .post(`/AuthManagerLogin`)
        .send({
            "email": "fadmin@fadmin.com",
            "password": "fadmin123"
          })
        .expectStatus(401)
        .expectValue('code', 16)
        .end( (err, res, body) =>
        {  
          if (err) {
            throw err
          } else {
              done()
          }
        })
    });
    it('returns 400 when the request body params are null', (done) => {
      api()
      .post(`/AuthManagerLogin`)
      .send({
          "email": null,
          "password": null
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
    })
  })

                                            //////////////
                                            //  CREATE  //
                                            //////////////

  // POST /api/v1/CreateEmployeeGroup
  describe('Creates an Employee Group and returns that Employee Group', () => {
    it('returns 200 when the request body params do match the swagger specification', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployeeGroup`)
      .send({
        "title": "group1",
        "description": "group1",
        "slug": "group1"
      })
      .expectStatus(200)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployeeGroup`)
      .send({
        "title": "a",
        "description": "a",
        "slug": "a"
      })
      .expectStatus(400)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
    it('returns 400 when the required request body params are null', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployeeGroup`)
      .send({
        "title": null,
        "description": "group1",
        "slug": null,
      })
      .expectStatus(400)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployeeGroup`)
      .send({
        "title": "group2",
        "description": null,
        "slug": "group2"
      })
      .expectStatus(200)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
  })
  

  // POST /api/v1/CreateEmployee
  describe('Creates an Employee and returns that Employee', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "description": "Ivan Ivanovich",
        "person": {
          "firstName": "Ivan",
          "lastName": "Ivanovich",
          "image": base64.image,
          "email": "ivanxxx@mail.com",
          "phone": "string"
        },
        "credentials": {
          "password": "ivanxxx123"
        },
        "group": 1
      })
      .expectStatus(200)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "description": null,
        "person": {
          "firstName": "Ivan2",
          "lastName": "Ivanovich2",
          "image": base64.image,
          "email": "ivanxxx2@mail.com",
          "phone": "string"
        },
        "credentials": {
          "password": "ivanxxx2123"
        },
        "group": 1
      })
      .expectStatus(200)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "description": "a",
        "person": {
          "firstName": "a",
          "lastName": "a",
          "image": "a",
          "email": "a",
          "phone": "a"
        },
        "credentials": {
          "password": "a"
        },
        "group": "a"
      })
      .expectStatus(400)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
    it('returns 400 when the required request body params are null', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "description": null,
        "person": {
          "firstName": null,
          "lastName": null,
          "image": null,
          "email": null,
          "phone": null
        },
        "credentials": {
          "password": null
        },
        "group": null
      })
      .expectStatus(400)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "description": "Ivan Ivanovich 3",
        "person": {
          "firstName": "Ivan3",
          "lastName": "Ivanovich3",
          "image": base64.image,
          "email": "ivanxxx3@mail.com",
          "phone": "string"
        },
        "credentials": {
          "password": "ivanxxx3123"
        },
        "group": 99
      })
      .expectStatus(404)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
  })

  // POST /api/v1/CreateDevice
  describe('Creates a Device and returns that Device and a Token', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateDevice`)
      .send({
        "title": "device_1_title",
        "description": "device_1_description",
        "physicalID": "device_1_ID",
        "type": "device_1",
        "employeeID": 1,
        "data": "eyAia2V5IjogInZhbHVlIiB9"
      })
      .expectStatus(200)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            global.deviceToken = body.token;
            done()
        }
      })
    });
    it('returns 200 when the optional request body params match are null', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateDevice`)
      .send({
        "title": "device_2_title",
        "description": null,
        "physicalID": "device_2_ID",
        "type": "device_2",
        "employeeID": 2,
        "data": "eyAia2V5IjogInZhbHVlIiB9"
      })
      .expectStatus(200)
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
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "title": "a",
        "description": "a",
        "physicalID": "a",
        "type": "a",
        "employeeID": 1,
        "data": "a"
      })
      .expectStatus(400)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
    it('returns 400 when the required request body params are null', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "title": null,
        "description": null,
        "physicalID": null,
        "type": null,
        "employeeID": null,
        "data": null
      })
      .expectStatus(400)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
    it('returns 400(?) when the specified Employee ID is not in the DB', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "title": "device_3_title",
        "description": "device_3_description",
        "physicalID": "device_3_ID",
        "type": "device_3",
        "employeeID": 6,
        "data": "eyAia2V5IjogInZhbHVlIiB9"
      })
      .expectStatus(400) // FIXME: This should be a 404(?)
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
    it('returns 400 when the specified Employee ID is already attached to another device', (done) => {
      api()
      .header('Authorization', global.managerToken)
      .post(`/CreateEmployee`)
      .send({
        "title": "device_3_title",
        "description": "device_3_description",
        "physicalID": "device_3_ID",
        "type": "device_3",
        "employeeID": 1,
        "data": "eyAia2V5IjogInZhbHVlIiB9"
      })
      .expectStatus(400)
      .end( (err, res, body) =>
      {  
        if (err) {
          throw err
        } else {
            done()
        }
      })
    });
  })

  // POST /api/v1/CreateSensorType
  describe('Creates a Sensor Type and returns that Sensor Type', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          api()
          .header('Authorization', global.managerToken)
          .post(`/CreateSensorType`)
          .send({
            "title": "sensor_type_1",
            "description": "string",
            "slug": "sensor_type_1",
            "graphType": "GRAPH_TYPE_LINE",
            "dataType": "DATA_TYPE_INT32"
          })
          .expectStatus(200)
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

  // TODO: POST /api/v1/CreateSensor

  // POST /api/v1/CreateIncident
  describe('Creates an Incident and returns that Incident', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          api()
          .header('Authorization', global.managerToken)
          .post(`/CreateIncident`)
          .send({
            "description": "incident_1",
            "employeeID": 1,
            "deviceID": 1,
            "sensorID": 1,
            "initialZone": 1,
            "reason": "accident",
            "status": "INCIDENT_STATUS_RESOLVED"
          })
          .expectStatus(200)
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

  // POST /api/v1/CreateManager
  describe('Creates a Manager and returns that Manager', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          api()
          .header('Authorization', global.managerToken)
          .post(`/CreateManager`)
          .send({
            "description": "manager_2",
            "person": {
              "firstName": "manager_2",
              "lastName": "manager_2",
              "image": base64.image,
              "email": "manager_2@mail.com",
              "phone": "string"
            },
            "credentials": {
              "password": "manager_2_123"
            },
            "capabilities": {
              "viewSingle": [
                "a"
              ],
              "viewSeveral": [
                "a"
              ],
              "editSingle": [
                "a"
              ],
              "editSeveral": [
                "a"
              ],
              "create": [
                "a"
              ],
              "delete": [
                "a"
              ]
            }
          })
          .expectStatus(200)
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

  // POST /api/v1/CreateZone
  describe('Creates a Zone and returns that Zone', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          api()
          .header('Authorization', global.managerToken)
          .post(`/CreateZone`)
          .send({
            "title": "zone_1",
            "description": "zone_1",
            "permissions": {
              "allowedEmployees": [
                1
              ]
            },
            "path": {
              "geojson": base64.geojson
            }
          })
          .expectStatus(200)
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


  // POST /api/v1/AuthEmployeeLogin
  describe('should login an Employee', () => {
    it('returns 200 when the request body params match the DB entry', (done) => {
          api()
          .post(`/AuthEmployeeLogin`)
          .send({
              "email": "ivanxxx@mail.com",
              "password": "ivanxxx123",
              "devicePhysicalID": "device_1_ID"
            })
          .expectStatus(200)
          .end( (err, res, body) =>
          {  
            if (err) {
              throw err;
            } else {
                done()
            }
          })
    })
  })

  // POST /api/v1/GenerateAuthQR
  describe('should get an QR code', () => {
    it('returns 200 when the request body params match the DB entry', (done) => {
          api()
          .header('Authorization', global.managerToken)
          .post(`/GenerateAuthQR`)
          .send({
              "employeeID": 1
            })
          .expectStatus(200)
          .end( (err, res, body) =>
          {  
            if (err) {
              throw err;
            } else {
                done()
            }
          })
    })
  })

  // FIXME: This errors out with 500, read more at: 
  // https://docs.google.com/spreadsheets/d/17hh7UODqE6ab2o93NhpY_IglIwGZ4VBC39dRmwiyji0/edit?usp=sharing
  // POST /api/v1/AuthByTimedToken
  // describe('should authorize an employee via the generated timed token from the QR code', () => {
  //   it('returns 200 when the request body params match the DB entry', (done) => {
  //         hippie()
  //         .json()
  //         .base('http://localhost:3000/api/v1')
  //         .header('Authorization', global.managerToken)
  //         .post(`/AuthByTimedToken`)
  //         .send({
  //             "token": "fAWnFGKUwRmRX2B9e7DPTywM3XRvjeWcfysJ"
  //           })
  //         .expectStatus(200)
  //         // .expectValue()
  //         .end( (err, res, body) =>
  //         {  
  //           if (err) {
  //             throw err;
  //           } else {
  //               done()
  //           }
  //         })
  //   })
  // })

})