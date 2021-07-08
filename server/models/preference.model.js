import mongoose from "mongoose";

const opts = { toJSON: { virtuals: true } };

const Preference = mongoose.model(
  "Preference",
  new mongoose.Schema({
    theme: String,
    language: String,
    username: String,
  }, opts)
);

export default Preference;