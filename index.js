'use strict'

const hippie = require('hippie');
global.managerToken = '';
global.employeeToken = '';
global.deviceToken = '';

// TODO: Add custom swagger parser validator
// function api() {
//   return hippie()
//     .json()
//     .base('http://localhost:3000/api/v1')
//     .auth('user', 'pass')
//     .serializer(customSerializer)
//     .parser(customParser)
//     .use(somethingSpecial)
//     .expect(somethingRepeatable);
// }

describe('LifeGuard V1 API Test', function () {

  // POST /api/v1/AuthManagerLogin
  describe('Logs in a manager user, returns a token and usertype', () => {
      it('returns 200 when the request body params match the DB entry', (done) => {
        hippie()
        .json()
        .base('http://localhost:3000/api/v1')
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
        hippie()
        .json()
        .base('http://localhost:3000/api/v1')
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
      hippie()
      .json()
      .base('http://localhost:3000/api/v1')
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
      hippie()
      .json()
      .base('http://localhost:3000/api/v1')
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
      hippie()
      .json()
      .base('http://localhost:3000/api/v1')
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
      hippie()
      .json()
      .base('http://localhost:3000/api/v1')
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
      hippie()
      .json()
      .base('http://localhost:3000/api/v1')
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
          .header('Authorization', global.managerToken)
          .post(`/CreateEmployee`)
          .send({
            "description": "Ivan Ivanovich",
            "person": {
              "firstName": "Ivan",
              "lastName": "Ivanovich",
              "image": "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",
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
    })
  })

  // POST /api/v1/CreateDevice
  describe('Creates a Device and returns that Device and a Token', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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
    })
  })

  // POST /api/v1/CreateSensorType
  describe('Creates a Sensor Type and returns that Sensor Type', () => {
    it('returns 200 when the request body params match the swagger specification', (done) => {
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
          .header('Authorization', global.managerToken)
          .post(`/CreateManager`)
          .send({
            "description": "manager_2",
            "person": {
              "firstName": "manager_2",
              "lastName": "manager_2",
              "image": "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",
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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
              "geojson": "ewogICJ0eXBlIjogIlBvbHlnb24iLAogICJjb29yZGluYXRlcyI6IFsKICAgIFsKICAgICAgWwogICAgICAgIC00OS45NjU4MjAzMTI1LAogICAgICAgIDcwLjU2ODgwMzMxNzYzMzQxCiAgICAgIF0sCiAgICAgIFsKICAgICAgICAtMzkuMzMxMDU0Njg3NSwKICAgICAgICA3MC41Njg4MDMzMTc2MzM0MQogICAgICBdLAogICAgICBbCiAgICAgICAgLTM5LjMzMTA1NDY4NzUsCiAgICAgICAgNzQuMDQzNzIyNTk4MTMyNQogICAgICBdLAogICAgICBbCiAgICAgICAgLTQ5Ljk2NTgyMDMxMjUsCiAgICAgICAgNzQuMDQzNzIyNTk4MTMyNQogICAgICBdLAogICAgICBbCiAgICAgICAgLTQ5Ljk2NTgyMDMxMjUsCiAgICAgICAgNzAuNTY4ODAzMzE3NjMzNDEKICAgICAgXQogICAgXQogIF0KfQ=="
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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
          hippie()
          .json()
          .base('http://localhost:3000/api/v1')
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