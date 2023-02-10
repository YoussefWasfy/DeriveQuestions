const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  articleName: String,
  articleText: String,
  questions: [String],
});

const Document = mongoose.model("Document", schema);

module.exports = Document;
