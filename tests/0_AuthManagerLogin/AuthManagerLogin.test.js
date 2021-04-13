'use strict'

const hippie = require('hippie');
const fs = require('fs');
const tokens = require('../../log/tokens.json');

function updateTokens()
{
  fs.writeFile(
    './log/tokens.json', 
    JSON.stringify(tokens, null, 2), 
    function writeJSON(err) {if (err) return console.log(err)}
    )
}

function api() {
  return hippie()
    .json()
    .base('http://localhost:3000/api/v1')
    .post(`/AuthManagerLogin`)
}

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
          tokens.managerToken = body.token;
          updateTokens();
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