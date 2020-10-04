const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// The Record model schema definition
const recordSchema = mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            trim: true,
        },
        value: {
            type: String,
            required: true,
            trim: true,
        },
        counts: {
            type: [Number],
        }
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
recordSchema.plugin(toJSON);
recordSchema.plugin(paginate);

/**
 * @typedef Record
 */
const Record = mongoose.model('records', recordSchema);

module.exports = Record;