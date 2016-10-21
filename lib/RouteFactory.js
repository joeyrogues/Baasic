



var Db = require('./Db')
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
        Db.all(entityName)
          .then(docs => reply(docs))
          .catch(error => reply(Boom.badRequest(error)))
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
        Db.get(entityName, request.params.id)
          .then(doc => reply(doc))
          .catch(error => reply(Boom.badRequest(error)))
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
        Db.insert(entityName, request.payload)
          .then(doc => reply(doc))
          .catch(error => reply(Boom.badRequest(error)))
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
        Db.update(entityName, request.params.id, request.payload)
          .then(doc => reply(doc))
          .catch(error => reply(Boom.badRequest(error)))
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
        throw 'Unimplemented'
      }
    }
  }
}

module.exports = RouteFactory