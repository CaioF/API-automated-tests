'use strict'

/**
 * Usage:  npx mocha index.js
 */

const SwaggerParser = require('swagger-parser')
const parser = new SwaggerParser()
const hippie = require('hippie-swagger')
const expect = require('chai').expect
const path = require('path')
const basePath = 'http://localhost:3000'

var dereferencedSwagger
var managerToken

describe('LifeGuard v2 API Test', function () {
  this.timeout(10000) // very large swagger files may take a few seconds to parse

  before(function (done) {
    parser.dereference(path.join(__dirname, './gen_openapiv2_api.swagger.json'), function (err, api) {
      if (err) return done(err)
      dereferencedSwagger = api
      done()
    })
  })

  describe('should login the default Manager and receive an auth token', () => {
      it('returns 200 when the request body params matche the DB entry', (done) => {
          hippie(dereferencedSwagger)
            .post(`${basePath}/api/v1/AuthManagerLogin`)
            .send({
                "email": "admin@admin.com",
                "password": "admin123"
              })
            .expectStatus(200)
            .expectValue('data.email', 'admin@admin.com')
            .end( (err, res, body) =>
            {  
                if (err) throw err;
                else {
                    managerToken = body.token;
                    done()
                }
            })
      })
      it('returns 401 when the request body params do not match the DB entry', (done) => {
        hippie(dereferencedSwagger)
          .post(`${basePath}/api/v1/AuthManagerLogin`)
          .send({
              "email": "fadmin@fadmin.com",
              "password": "fadmin123"
            })
          .expectStatus(401)
          .expectValue('code', 16)
          .end( (err, res, body) =>
          {  
              if (err) throw err;
              else {
                  done()
              }
          })
    })
    it('returns 400 when the request body params are null', (done) => {
        hippie(dereferencedSwagger)
          .post(`${basePath}/api/v1/AuthManagerLogin`)
          .send({
              "email": null,
              "password": null
            })
          .expectStatus(400)
          .expectValue('code', 3)
          .end( (err, res, body) =>
          {  
              if (err) throw err;
              else {
                  done()
              }
          })
    })
  })
})