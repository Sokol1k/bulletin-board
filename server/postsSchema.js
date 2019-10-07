const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String
    },
    text: {
      type: String
    },
    authorName: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("posts", Post);
