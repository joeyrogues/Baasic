



var Database = require('./Database')
var Boom = require('boom')

var RouteFactory = {
  get: function (entityName) {
    var url = '/' + entityName

    console.log('Registered GET ' + url)

    return {
      method: 'GET',
      path: url,
      handler: function (request, reply) {
        var entity = Database.all(entityName)

        reply(entity)
      }
    }
  },

  getId: function (entityName) {
    var url = '/' + entityName + '/{id}'

    console.log('Registered GET ' + url)

    return {
      method: 'GET',
      path: url,
      handler: function (request, reply) {
        try {
          var entity = Database.get(entityName, request.params.id)
          reply(entity)
        } catch(e) {
          if (e === Database.error.NOT_FOUND) {
            reply(Boom.notFound())
            return
          }

          reply(Boom.badImplementation(e))
        }
      }
    }
  },

  post: function (entityName) {
    var url = '/' + entityName

    console.log('Registered POST ' + url)

    return {
      method: 'POST',
      path: url,
      handler: function (request, reply) {
        var entity = request.payload
        entity.id = Database.generateUUID()

        try {
          Database.insert(entityName, entity.id, entity)
          reply(entity)
        } catch(e) {
          reply(Boom.badImplementation(e))
        }
      }
    }
  },

  postOne: function (entityName) {
    var url = '/' + entityName + '/{id}'

    console.log('Registered POST ' + url)

    return {
      method: 'POST',
      path: url,
      handler: function (request, reply) {
        var entity = request.payload
        entity.id = request.params.id

        try {
          Database.replace(entityName, entity.id, entity)
          reply(entity)
        } catch(e) {
          if (e === Database.error.NOT_FOUND) {
            reply(Boom.notFound())
            return
          }

          reply(Boom.badImplementation(e))
        }
      }
    }
  }
}

module.exports = RouteFactory