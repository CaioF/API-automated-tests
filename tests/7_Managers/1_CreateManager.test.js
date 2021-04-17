'use strict'

const hippie = require('hippie');
const tokens = require('../data_files/tokens.json');
const base64 = require('../data_files/base64.json');

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .header('Authorization', tokens.managerToken)
    .post(`/CreateManager`)
}

// POST /api/v1/CreateManager
describe('Creates a Manager and returns that Manager', () => {

  it('returns 200 when the request body params match the swagger specification', (done) => {
    api()
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
    .expectValue('manager.person.email', 'manager_2@mail.com')
    .expectValue('manager.credentials.password', '')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 200 when the optional request body params match are null', (done) => {
    api()
    .send({
      "description": null,
      "person": {
        "firstName": "manager_3",
        "lastName": "manager_3",
        "image": base64.image,
        "email": "manager_3@mail.com",
        "phone": "string"
      },
      "credentials": {
        "password": "manager_3_123"
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
    .expectValue('manager.person.email', 'manager_3@mail.com')
    .expectValue('manager.credentials.password', '')
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params do not match the swagger specification', (done) => {
    api()
    .send({
      "description": "a",
      "person": {
        "firstName": "a",
        "lastName": "a",
        "image": base64.image,
        "email": "a@a.a",
        "phone": "a"
      },
      "credentials": {
        "password": "a"
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

  it('returns 400 when the required request body params are null', (done) => {
    api()
    .send({
      "description": "description",
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
      "capabilities": {
        "viewSingle": [
          null
        ],
        "viewSeveral": [
          null
        ],
        "editSingle": [
          null
        ],
        "editSeveral": [
          null
        ],
        "create": [
          null
        ],
        "delete": [
          null
        ]
      }
    })
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

  it('returns 400 when the specified email is already in use', (done) => {
    api()
    .send({
      "description": null,
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
    .expectStatus(400)
    .expectValue('code', 9)
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