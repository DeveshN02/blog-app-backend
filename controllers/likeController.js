const Post = require("../models/post.model");
const Like = require("../models/like.model");

// for like a post
const handleLike = async (req, res) => {
  try {
    const { post, user } = await req.body;
    const like = new Like({
      post,
      user,
    });

    const likepost = await like.save();

    // updating post collection
    const updatedPosts = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: likepost._id },
      },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.status(201).json({ posts: updatedPosts });
  } catch (err) {
    console.log(err, "there is some error in like the Post");
    res.status(500).json({ error: "error while like posts" });
  }
};

// for unlike a post

const handleUnlike = async (req, res) => {
  try {
    const { post, like } = req.body;
    // find and delete from like wala collection
    const updatelike = await Like.findOneAndDelete({ post: post, _id: like });

    // find and update in the post
    const updatepost = await Post.findByIdAndUpdate(
      post,
      {
        $pull: { likes: updatelike._id },
      },
      { new: true }
    );

    res.json({
      post: updatepost,
    });
  } catch (err) {
    console.log(err, "there is some in unlike posts");
    res.json({ error: "error while unlike a post" });
  }
};
module.exports = { handleLike, handleUnlike };
