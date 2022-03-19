const express = require("express");
const connectDB = require("./db/connectDB");
const Blog = require("./db/Blog");
const { genParagraph, genTitle, genCategory } = require("./Random");

connectDB();
const app = express();

/// For creating a blog
app.get("/create", async (req, res) => {
  const blog = new Blog({
    title: genTitle(),
    content: genParagraph(),
    category: genCategory(),
  });
  await blog.save();
  res.json({ blog });
});

app.get("/blogs", async (req, res) => {
  const { search, category, page, limit } = req.query;
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = parseInt(page) * parseInt(limit);

  // For All Blogs
  if (!search && !category) {
    const blogs = await Blog.find()
      .limit(limit)
      .skip(startIndex)
      .sort({ time: -1 });
    const total = await Blog.find().countDocuments();
    const totalResults = blogs.length;
    res.json({ total, totalResults, blogs });
  }
  // For Category Only
  else if (category && !search) {
    const blogs = await Blog.find({ category })
      .limit(limit)
      .skip(startIndex)
      .sort({ time: -1 });
    const total = await Blog.find({ category }).countDocuments();
    const totalResults = blogs.length;
    res.json({ total, totalResults, blogs });
  }
  // For Search Only
  else if (!category && search) {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "$i" } },
        { content: { $regex: search, $options: "$i" } },
      ],
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ time: -1 });
    const total = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "$i" } },
        { content: { $regex: search, $options: "$i" } },
      ],
    }).countDocuments();
    const totalResults = blogs.length;
    res.json({ total, totalResults, blogs });
  }
  // For Both Category and Search
  else if (category && search) {
    const blogs = await Blog.find({
      $and: [
        { category },
        {
          $or: [
            { title: { $regex: search, $options: "$i" } },
            { content: { $regex: search, $options: "$i" } },
          ],
        },
      ],
    })
      .limit(limit)
      .skip(startIndex)
      .sort({ time: -1 });
    const total = await Blog.find({
      $and: [
        { category },
        {
          $or: [
            { title: { $regex: search, $options: "$i" } },
            { content: { $regex: search, $options: "$i" } },
          ],
        },
      ],
    }).countDocuments();
    const totalResults = blogs.length;
    res.json({ total, totalResults, blogs });
  }
});

/// Getting individual blog
app.get("/blog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json({blog})
});

app.listen(5000);