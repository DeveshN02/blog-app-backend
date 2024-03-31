const handleDummy = require("../controllers/dummy");

const express = require("express");
const handleComment = require("../controllers/commentController");
const { createPost } = require("../controllers/postController");
const { getAllPosts } = require("../controllers/postController");
const { handleLike, handleUnlike } = require("../controllers/likeController");

const router = express.Router();

router.get("/dummy", handleDummy);
router.post("/comments/create", handleComment);
router.get("/posts", getAllPosts);
router.post("/likes/like", handleLike);
router.post("/likes/unlike", handleUnlike);
router.post("/posts/create", createPost);

module.exports = router;
