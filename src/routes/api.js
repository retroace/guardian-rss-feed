const express = require('express');
const CacheMiddleware = require('../middlewares/cacheMiddleware');

const router = express.Router();
const articleController = require('../controllers/articleController');
const routeValidator = require('../middlewares/routeValidator');

router.get('/article/:subject', routeValidator, CacheMiddleware, articleController.index);

module.exports = router;
