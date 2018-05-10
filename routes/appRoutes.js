const express = require('express');
const router = express.Router();
const getSearchesHandler = require('../handlers/getSearchesHandler');
const searchHandler = require('../handlers/searchHandler');

router.get('/latest/imagesearch', getSearchesHandler);
router.get('/imagesearch/:searchterm', searchHandler);

module.exports = router;
