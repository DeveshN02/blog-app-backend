const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const handleComment = async (req, res) => {
  try {
    // fetch data from res body
    const { post, user, body } = await req.body;

    // now create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    // save the new comment into the database
    // save is the another method to create a document in db like create method
    const savedComment = await comment.save();

    // now find post by id and add this new comment into the array of post
    const updatepost = await Post.findByIdAndUpdate(
      post,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments")
      .exec(); //populate the comment array with comment documents

    // in the above $push is used for update comment in Post we can use $pull for delete comment for Post
    // new true ka use krne se ye ab updated wala comment hi return krega

    res.json({
      post: updatepost,
    });
  } catch (err) {
    console.log(err, "error in the comment updation");
    res.status(501).json({
      message: "failed to comment",
    });
  }
};

module.exports = handleComment;
