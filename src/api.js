'use strict'

module.exports = function api (options) {
  const seneca = this

  this.add('role:api, path:ping', function (args, done) {
    done(null, {pong: Date.now(), version: 2})
  })

  this.add('role:api, path:arithmetic', function (args, done) {
    this.act('role:arithmetic-game, cmd:create', done)
  })

  this.act('role:web', {use: {
      prefix: '/api',
      pin: 'role:api, path:*',
      map: {
        ping: { GET: true },
        arithmetic: { GET: true },
      }
  }})
}
