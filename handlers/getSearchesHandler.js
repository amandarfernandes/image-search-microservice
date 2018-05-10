const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const axios = require('axios');
//const keys = require("../config/keys");

module.exports = async (req, res) => {
  const searches = await Search.find()
    .sort('-dateSearched')
    .limit(5)
    .select('searchStr dateSearched -_id');
  res.send(searches);
};
