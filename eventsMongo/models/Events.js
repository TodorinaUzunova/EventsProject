const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const eventSchema = new Schema({

     event: {
        type: String,
        required: true,
    },

    dateTime: {
        type: Date,
        required: true
    },

     description: {
        type: String,
        required: true,
    },

    imageURL: {
        type: String,
        required: true,
    },

   author: {
        type: ObjectId,
        ref: 'User'
    }

});

module.exports = new Model('Event', eventSchema);