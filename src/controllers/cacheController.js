const Cache = require('../services/cacheService');


/**
 * Clear all cache
 * @param {obj} req Request instance of express
 * @param {obj} res Response instance of express
 * @returns {res}
 */
const clearAll = async (req, res) => {
  Cache.client.flushdb();

  return res.status(200).json({'message': "All cache were cleared"});
};

module.exports = {
  index,
};
