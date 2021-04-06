'use strict'

/**
 * Usage:  mocha index.js
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
    console.log('parsed file')
  })

  describe("should login the default Manager and receive an auth token", () => {
      it('works when the request matches the swagger file', (done) => {
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
  })
})