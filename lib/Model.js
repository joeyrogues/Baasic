



var MODELS = require('../models')

var Model = {
  _models: null,

  getAll: function () {
    if (!this._models) {
      this._models = MODELS
    }

    return this._models
  }
}

module.exports = Model