const { Thought, User } = require("../models");
const { reactionSchema } = require("../schemas/ReactionSchema");

module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },


  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { new: true }
      );
      console.log("User ID:", req.body.userId);

      if (!userData) {
        throw new Error("User not found");
      }

      res.json('Thought Created');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }
  
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json('Thought Updated');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No course with that ID" });
      }

  
      res.json("Thought Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const { reactionBody, username } = req.body;
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      const newReaction = {
        reactionBody,
        username,
      };

      thought.reactions.push(newReaction);
      const savedThought = await thought.save();

      res.status(201).json('Reaction Added');
    } catch (err) {
      console.log(err);
      return res.status(500).json(err.message);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reactionId = req.params.reactionId;
      const thoughtId = req.params.thoughtId;
      console.log(req.params.thoughtId)

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ error: "Thought not found" });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reaction) => reaction._id.toString() === reactionId
      );

      if (reactionIndex === -1) {
        return res.status(404).json({ error: "Reaction not found" });
      }
      thought.reactions.splice(reactionIndex, 1);

      const savedThought = await thought.save();

      res.status(200).json('Reaction Deleted');
    } catch {
      console.error(err);
      res.status(500).json({ error: "Did no delete reaction" });
    }
  },
};
