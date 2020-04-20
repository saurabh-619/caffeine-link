const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Schema.Types;

const postSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      },
    },
  ],
  comments: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
