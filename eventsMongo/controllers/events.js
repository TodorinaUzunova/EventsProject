const models = require('../models');

module.exports = {
  get: (req, res, next) => {
    const limit = +req.query.limit;
    const { id } = req.params;

    if (limit) {
      models.Events.find().populate('author').sort({ _id: -1 }).limit(limit)
        .then((events) => res.send(events))
        .catch(next);
      return;
    }
    models.Events.find(id ? { _id: id } : {}).populate('author')
      .then((events) => res.send(events))
      .catch(next);
  },

  post: (req, res, next) => {
    const { event, dateTime, description, imageURL } = req.body;
    const { _id } = req.user;

    models.Events.create({ author: _id, event, dateTime, description, imageURL })
      .then((createdEvent) => {
        return Promise.all([
          models.User.updateOne({ _id }, { $push: { event: createdEvent } }),
          models.Events.findOne({ _id: createdEvent._id })
        ]);
      })
      .then(([modifiedObj, eventObj]) => {
        res.send(eventObj);
      })
      .catch(next);
  },

  // put: (req, res, next) => {
  //   const id = req.params.id;
  //   const { _id } = req.user;

  //   const { donatedAmount } = req.body;
  //   models.Causes.updateOne({ _id: id }, { $inc: { collectedAmount: donatedAmount } })
  //     .then((updatedCause) => {
  //       return Promise.all([
  //         models.User.updateOne({ _id }, { $push: { donatedTo: id } }),
  //         models.Causes.findOne({ _id: updatedCause._id })
  //       ])
  //     })
  //     .then(([modifiedObj, causeObj]) => {
  //       res.send(causeObj);
  //     })
  //     .catch(next)
  // },

  delete: (req, res, next) => {
    const id = req.params.id;
    models.Events.deleteOne({ _id: id })
      .then((removedEvent) => res.send(removedEvent))
      .catch(next)
  }
};