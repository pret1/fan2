import mongoose from "mongoose";

const opts = { toJSON: { virtuals: true } };

const Work = mongoose.model(
  "Work",
  new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    username: String,
    author: String,
    rating: String,
  }, opts)
);

export default Work;