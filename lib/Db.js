



var db = require('nosql').load('./db/db.nosql')

var Db = {
  generateUUID: function () {
    var d = new Date().getTime()

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0
      d = Math.floor(d/16)
      return (c=='x' ? r : (r&0x3|0x8)).toString(16)
    })

    return uuid
  },

  all: function (entityName) {
    return new Promise((resolve, reject) => {
      if (!entityName) {
        return reject('Db::all() - Missing parameters (entityName)')
      }

      db.find()
        .where('_type', entityName)
        .callback(function (error, entities) {
          if (error) {
            return reject(error)
          }

          return resolve(entities)
        })
    })
  },

  get: function (entityName, id) {
    return new Promise((resolve, reject) => {
      if (!entityName) {
        return reject('Db::get() - Missing parameters (entityName)')
      }

      if (!id) {
        return reject('Db::get() - Missing parameters (id)')
      }

      db.find()
        .where('_type', entityName)
        .where('_id', id)
        .first()
        .callback(function (error, data) {
          if (error) {
            return reject(error)
          }

          return resolve(data)
        })
    })
  },

  insert: function (entityName, entity) {
    return new Promise((resolve, reject) => {
      if (!entityName) {
        return reject('Db::insert() - Missing parameters (entityName)')
      }

      if (!entity) {
        return reject('Db::insert() - Missing parameters (entity)')
      }

      var clonedEntity = JSON.parse( JSON.stringify(entity) )
      clonedEntity._id = this.generateUUID()
      clonedEntity._type = entityName

      db.insert(clonedEntity)
        .callback(function (error, data) {
          if (error) {
            return reject(error)
          }

          return resolve(clonedEntity)
        })
    })
  },

  update: function (entityName, id, entity) {
    return new Promise(function (resolve, reject) {
      if (!entityName) {
        return reject('Db::update() - Missing parameters (entityName)')
      }

      if (!id) {
        return reject('Db::update() - Missing parameters (id)')
      }

      if (!entity) {
        return reject('Db::update() - Missing parameters (entity)')
      }

      if (!entity._id) {
        return reject('Db::update() - Missing attribute (_id)')
      }

      if (entity._id !== id) {
        return reject('Db::update() - Inconsistent attribute (_id)')
      }

      if (!entity._type) {
        return reject('Db::update() - Missing attribute (_type)')
      }

      if (entity._type !== entityName) {
        return reject('Db::update() - Inconsistent attribute (_type)')
      }

      var clonedEntity = JSON.parse( JSON.stringify(entity) )

      db.update(clonedEntity)
        .where('_type', entityName)
        .where('_id', entity.id)
        .callback(function (error, data) {
          if (error) {
            return reject(error)
          }

          return resolve(clonedEntity)
        })
    })
  },

  delete: function (entityName, id) {
    return new Promise(function (resolve, reject) {
      if (!entityName) {
        return reject('Db::delete() - Missing parameters (entityName)')
      }

      if (!id) {
        return reject('Db::delete() - Missing parameters (id)')
      }

      db.remove()
        .where('_type', entityName)
        .where('_id', id)
        .callback(function (error, data) {
          if (error) {
            return reject(error)
          }

          return resolve(data)
        })
    })
  }
}

module.exports = Db