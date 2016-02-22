var Chairo = require ( 'chairo' )
var Hapi = require ( 'hapi' )

var server = new Hapi.Server ()
server.connection()

server.register(
  {
    register: Chairo,
    options: {
      // options for Seneca
    }
  }, function ( err ) {
    var seneca = server.seneca

    seneca.add('role:api,cmd:zig',function(args,done){
      done(null,{bar:'g'})
    })

    seneca.add('role:api,cmd:bar',function(args,done){
      done(null,{bar:'b'})
    })

    seneca.add('role:api,cmd:qaz',function(args,done){
      done(null,{qaz:'z'})
    })

    seneca.act('role:web',{use:{

      // define some routes that start with /my-api
      prefix: '/api',

      // use action patterns where role has the value 'api' and cmd has some defined value
      pin: {role:'api',cmd:'*'},

      // for each value of cmd, match some HTTP method, and use the
      // query parameters as values for the action
      map:{
        zig: true,                // GET is the default
        bar: {GET:true},          // explicitly accepting GETs
        qaz: {GET:true,POST:true} // accepting both GETs and POSTs
      }
    }})
  }
)
