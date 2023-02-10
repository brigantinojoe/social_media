const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: () => new Date(+new Date() + 0 * 24 * 60 * 60 * 1000),
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
    }
);

module.exports = reactionSchema;