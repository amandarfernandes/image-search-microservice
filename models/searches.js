const mongoose = require("mongoose");
const { Schema } = mongoose;

const SearchesSchema = new Schema({
  searchStr: { type: String, required: true },
  dateSearched: { type: Date, default: Date.now }
});

mongoose.model("Search", SearchesSchema);
