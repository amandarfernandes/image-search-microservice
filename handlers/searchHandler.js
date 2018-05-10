const mongoose = require('mongoose');
const Search = mongoose.model('Search');
const axios = require('axios');
const keys = require('../config/keys');

module.exports = async (req, res) => {
  let url = `${keys.GOOGLE_URI}${
    req.params.searchterm
  }&fields=items(title,link,displayLink,pagemap(cse_image))`;

  if (req.query.offset && /^\d+$/.test(req.query.offset)) {
    url = `${url}&start=${req.query.offset}`;
  }

  try {
    let search = new Search({ searchStr: req.params.searchterm });
    await search.save();

    const results = await axios.get(url);

    let resultsArr = [];
    results.data.items.forEach(result => {
      resultsArr.push({
        title: result.title,
        snippet: result.snippet,
        context: result.link,
        url: result.pagemap.cse_image[0].src,
        alt: result.displayLink
      });
    });
    res.send(resultsArr);
  } catch (err) {
    res.status(422).send(err);
  }
};
