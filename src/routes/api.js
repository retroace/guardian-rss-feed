const express = require('express');
const CacheMiddleware = require('./../middlewares/cacheMiddleware');
const router = express.Router();
const articleController = require('./../controllers/articleController');


router.get('/article/:subject', CacheMiddleware, articleController.index);


module.exports = router;
