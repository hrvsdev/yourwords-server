const { default: mongoose } = require("mongoose");

blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: { type: String, default: "https://picsum.photos/300" },
  category: {type: String, default: "General"},
  time: { type: Date, default: Date.now() },
  author: { type: String, default: "Harsh Vyas" },
});

Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog;