



var Database = require('./Database')
var Boom = require('boom')

var RouteFactory = {
  get: function (entityName) {
    var url = '/' + entityName

    console.log('    GET ' + url)

    return {
      config: { auth: { strategy: 'x-access-token' } },
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

    console.log('    GET ' + url)

    return {
      config: { auth: { strategy: 'x-access-token' } },
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

    console.log('   POST ' + url)

    return {
      config: { auth: { strategy: 'x-access-token' } },
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

  postId: function (entityName) {
    var url = '/' + entityName + '/{id}'

    console.log('   POST ' + url)

    return {
      config: { auth: { strategy: 'x-access-token' } },
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
  },

  deleteId: function (entityName) {
    var url = '/' + entityName + '/{id}'

    console.log(' DELETE ' + url)

    return {
      config: { auth: { strategy: 'x-access-token' } },
      method: 'DELETE',
      path: url,
      handler: function (request, reply) {
        var id = request.params.id

        try {
          Database.delete(entityName, id)
          reply()
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