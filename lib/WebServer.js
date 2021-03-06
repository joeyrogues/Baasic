



var Hapi = require('hapi')

var RouteFactory          = require('./RouteFactory')
var AuthenticationService = require('./AuthenticationService')
var LearningRoute         = require('./Learning')

var WebServer = function (config) {
  var server = new Hapi.Server()

  server.connection({
    port: process.env.PORT || config.port
  })

  server.register({
    register: require('hapi-cors'),
    options: {
      methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS'
      ]
    }
  }, function (error) {
    if (error) {
      console.log(error)
    }
  })

  server.register(require('hapi-auth-bearer-simple'), function (error) {
    if (error) {
      console.log(error)
    }

    server.auth.strategy('x-access-token', 'bearerAuth', {
      validateFunction: function (token, callback) {
        if (!token) {
          return callback(null, false)
        }

        var authContext = AuthenticationService.getContext(token)
        if (!authContext) {
          return callback(null, false)
        }

        return callback(null, true, authContext)
      }
    })
  }, function (error) {
    if (error) {
      console.log(error)
    }
  })

  var routes = []
  require('../models').forEach(function (model) {
    routes.push(
        RouteFactory.get(model.plural)
      , RouteFactory.getId(model.plural)
      , RouteFactory.post(model.plural)
      , RouteFactory.postId(model.plural)
      , RouteFactory.deleteId(model.plural)
    )
  })
  server.route(routes)

  server.route(LearningRoute.getRoutes())

  server.start(function (error) {
    if (error) {
      console.log(error)
    }

    console.log('WebServer running at ' + server.info.uri)
  })

  server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode)
  })

  return server
}

module.exports = WebServer