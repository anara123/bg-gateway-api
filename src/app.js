'use strict'

var APP_PORT = process.env.APP_PORT || 3000
var SRV_HOST = process.env.SRV_HOST || '127.0.0.1'

var seneca = require('seneca')({
  default_plugins:{
    web:false
  }
})

seneca
	.use(require('seneca-web'))
  .use('./api.js')
  // .client({ 
  // 	port: 8080,
  // 	host: SRV_HOST 
  // })
  .use('seneca-amqp-transport')
  .client({
    type: 'amqp',
    url: 'amqp://guest@guest:rabbit1:5672/seneca?locale=es_AR',
    pin: 'role:arithmetic-game'
  })

var app = require('express')()
  .use(require("body-parser").json())
  .use(seneca.export('web'))


if(!module.parent){ 
  app.listen(APP_PORT);
}
  

module.exports = app
