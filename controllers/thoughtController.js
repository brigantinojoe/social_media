const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate({ _id: req.body.userId },
                    {
                        $push: {
                            thoughts: {
                                _id: ObjectId(thought.id),
                            }
                        }
                    }
                )
                    .then((thought) => res.json(thought))
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json({ message: 'Thought deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $push: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username,
                    }
                }
            }
        )
            .then((reaction) => res.json(reaction))
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $pull: {
                    reactions: {
                        reactionId: ObjectId(req.body.reactionId)
                    }
                }
            }
        ).then(() => res.json({ message: `Reaction removed!`, }))
            .catch((err) => res.status(500).json(err));
    },
}
