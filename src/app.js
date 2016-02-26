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
  

var app = require('express')()
  .use(require("body-parser").json())
  .use(seneca.export('web'))


if(!module.parent){ 
  seneca
    .use('seneca-amqp-transport')
    .client({
      type: 'amqp',
      url: process.env.AMQP_URL,
      pin: 'role:arithmetic-game'
    })
  
  app.listen(APP_PORT);
}
  

module.exports = app
