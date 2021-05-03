'use strict'

const hippie = require('hippie');
const util = require ('../../util');
const tokens = require('../../tokens.json');
const config = require('../../config.json');

function api() {
  return hippie()
    .json()
    .base(config.url)
    .post(`/AuthManagerLogin`)
}

describe('POST /AuthManagerLogin\nLogs in a manager user, returns a token and usertype', () => {

  it('returns 200 when the request body params match the DB entry', (done) => {
    api()
      .send({
          "email": "manager_2@mail.com",
          "password": "manager2123"
        })
      .expectStatus(200)
      .expectValue('data.email', "manager_2@mail.com")
      .expectKey('token')
      .end( (err, res, body) =>
      {  
        if (err) {
          throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
        } else {
          tokens.managerToken2 = body.token;
          util.updateTokens(tokens);
          done()
        }
      })
  });

  it('returns 401 when the request body params do not match the DB entry', (done) => {
    api()
    .send({
        "email": "fadmin@fadmin.com",
        "password": "fadmin123"
      })
    .expectStatus(401)
    .expectValue('code', 16)
    .end( (err, res, body) =>
    {  
      if (err) {
        throw new Error(`\nMOCHA ERR:\n${err.message}\n\nRESPONSE ERR:\n${JSON.stringify(body)}`)
      } else {
          done()
      }
    })
  });

  it('returns 400 when the request body params are null', (done) => {
    api()
    .send({
        "email": null,
        "password": null
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
  })

})