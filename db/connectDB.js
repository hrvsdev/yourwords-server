mongoose = require("mongoose");

connectDB = () => {
  mongoose.connect(
    "mongodb://localhost/YourWords" ||
    "mongodb+srv://harshvyas:yw.harsh123@cluster0.uzdkq.mongodb.net/yourwords"
  );
};

module.exports = connectDB;
