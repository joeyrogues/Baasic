



var Model = require('./Model')
var RouteFactory = require('./RouteFactory')

var Hapi = require('hapi')

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
        console.log('fuck you')
        console.log(token)

        return callback(null, token === "joey", {
          truc: "fuck"
        })
      }
    })
  }, function (error) {
    if (error) {
      console.log(error)
    }
  })

  var routes = []

  var models = Model.getAll()
  models.forEach(function (model) {
    routes.push(
        RouteFactory.get(model.plural)
      , RouteFactory.getId(model.plural)
      , RouteFactory.post(model.plural)
      , RouteFactory.postId(model.plural)
      , RouteFactory.deleteId(model.plural)
    )
  })

  server.route(routes)

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