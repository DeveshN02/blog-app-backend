const mongoose = require("mongoose");

// creating schema
const CommentSchema = new mongoose.Schema({
  post: {
    // by this method we can connect one schema to another
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // this is target post that on which post user comment
  },
  user: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
