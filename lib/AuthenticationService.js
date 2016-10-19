



var AuthenticationService = {
  _store: {
    'awesome': {
        username  : 'joeyrogues'
      , firstname : 'joey'
      , lastname  : 'rogues'
      , _token    : 'awesome'
    }
  },

  getContext: function (token) {
    if (!token) {
      return null;
    }

    return this._store[token]
  },

  putContext: function (token, context) {
    if (!token || !context) {
      throw 'AuthenticationService::put() - Missing Parameters'
    }

    this._store[token] = context
    this._store[token]._token = token

    return this._store[token]
  }
}

module.exports = AuthenticationService