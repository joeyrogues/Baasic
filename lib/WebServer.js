



var Model = require('./Model')
var RouteFactory = require('./RouteFactory')

var Hapi = require('hapi')

var WebServer = function (config) {
  var server = new Hapi.Server()

  server.connection({
    host: config.host,
    port: config.port
  })

  var routes = []

  var models = Model.getAll()
  models.forEach(function (model) {
    routes.push(
        RouteFactory.get(model.plural)
      , RouteFactory.getId(model.plural)
      , RouteFactory.post(model.plural)
      , RouteFactory.postOne(model.plural)
    )
  })

  server.route(routes)

  server.start(function (error) {
    if (error) {
      throw error
    }

    console.log('WebServer running at ' + server.info.uri)
  })

  server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
  })

  return server
}

module.exports = WebServer