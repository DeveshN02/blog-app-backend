const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    // fetch title body from req ki body
    const { title, body } = await req.body;

    // now create a object for post
    const post = new Post({
      title,
      body,
    });

    const savedPost = await post.save();

    res.json({
      post: savedPost,
    });
  } catch (err) {
    console.log(err, " Error while creating a post");
    res.json({
      error: "error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    // agr find() ko ese hi chhod denge to comments or likes ki id bs return krega agr comment id render karana h to populate function of model wale commnets and likes se link krna hoga or usko extc() krna hoga
    const posts = await Post.find()
      .populate("comments")
      .populate("likes")
      .exec();
    res.status(201).json({ posts });
  } catch (error) {
    console.log("there is error to fetch all posts", error);
    res.status(500).json({
      error: "error while fetch all posts ",
    });
  }
};
