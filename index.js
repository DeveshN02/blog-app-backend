const express = require("express");
const app = express();

// connecting mongodb
const ConnectMongoDB = require("./dbConnnect");
ConnectMongoDB();

// define middlewares
app.use(express.json());

// mounting routes
const blog = require("./routes/blog");
app.use("/api/blog", blog);

// starting server
require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("the server started at Port ", PORT);
});

// default routes for home page
app.get("/", (req, res) => {
  res.send("Hello guys You are at homepage");
});
