const mongoose = require("mongoose");

require("dotenv").config();
const ConnectMongoDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log("db connected successfully"))
    .catch((err) => {
      console.log("error in connecting mongodb", err);
    });
};

module.exports = ConnectMongoDB;
