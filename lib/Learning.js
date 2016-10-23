



var Boom = require('boom')
var KNN  = require('ml-knn')
var knn  = new KNN()

var Learning = {
  train: function (training, predictions) {
    return new Promise(function (resolve, reject) {
      return resolve(knn.train(training, predictions))
    })
  },

  predict: function (dataset) {
    return new Promise(function (resolve, reject) {
      return resolve(knn.predict(dataset))
    })
  }
}

var LearningRoutes = {
  getRoutes: function () {
    return [{
      method: 'POST',
      path: '/learning/knn/train',
      handler: function (request, reply) {
        if (!request.payload) {
          return reply(Boom.badRequest())
        }

        var training = request.payload.training
        var predictions = request.payload.predictions
        if (!training || !predictions) {
          return reply(Boom.badRequest())
        }

        Learning
          .train(
            training,
            predictions
          )
          .then(response => reply(response))
          .catch(error => reply(Boom.badRequest(error)))
      }
    }, {
      method: 'POST',
      path: '/learning/knn/predict',
      handler: function (request, reply) {
        if (!request.payload) {
          return reply(Boom.badRequest())
        }

        var dataset = request.payload.dataset
        if (!dataset) {
          return reply(Boom.badRequest())
        }

        Learning
          .predict(dataset)
          .then(response => reply(response))
          .catch(error => reply(Boom.badRequest(error)))
      }
    }]
  }
}

module.exports = LearningRoutes