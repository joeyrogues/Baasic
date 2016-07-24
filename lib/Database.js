



var Database = {
  error: {
    NOT_FOUND:     'Database::replace() - Entity not found',
    ALREADY_EXIST: 'Database::replace() - Entity already exist'
  },

  _store: {},

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
    if (!this._store[entityName]) {
      return []
    }

    return Object.keys(this._store[entityName]).map((key) => {
      return this._store[entityName][key]
    })
  },

  get: function (entityName, id) {
    if (!this._store[entityName] || !this._store[entityName][id]) {
      throw this.error.NOT_FOUND
    }

    return this._store[entityName][id]
  },

  insert: function (entityName, id, entity) {
    if (this._store[entityName] && this._store[entityName][id]) {
      throw this.error.ALREADY_EXIST
    }

    this._store[entityName]     = this._store[entityName] || {}
    this._store[entityName][id] = entity
  },

  replace: function (entityName, id, entity) {
    if (!this._store[entityName] || !this._store[entityName][id]) {
      throw this.error.NOT_FOUND
    }

    this._store[entityName][id] = this._store[entityName][id] || entity
  },

  delete: function (entityName, id) {
    if (!this._store[entityName] || !this._store[entityName][id]) {
      throw this.error.NOT_FOUND
    }

    delete this._store[entityName][id]
  }
}

module.exports = Database