const { Schema, model } = require('mongoose');
const reactionSchema = require("./reactions");

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: () => new Date(+new Date() + 0 * 24 * 60 * 60 * 1000),
            get: (createdAtVal) => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  })
  .set(function (v) {
    this.set({ v });
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
