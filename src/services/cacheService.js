let cache = null;
const redisCache = require('../cacheDriver/RedisDriver');

// Extend other cache from here
switch (process.env.CACHE_DRIVER) {
  case 'redis':
    cache = redisCache;
    break;
  default:
    cache = redisCache;
    break;
}

/**
 * Get cache
 * @param {string} key Get cache by key
 */
const get = async (key) => cache.get(key);

/**
 * Set cache
 *
 * @param {string} key Cache key name
 * @param {string} data Cache data to set
 * @param {integer} time Time for expiry in seconds
 */
const set = (key, data, time = 600) => cache.set(key, data, time);

/**
 * Update cache
 *
 * @param {string} key Cache key name
 * @param {string} data Cache data to set
 * @param {integer} time Time for expiry in seconds
 */
const put = (key, data, time = 600) => cache.set(key, data, time);

/**
 * Delete cache by key
 *
 * @param {string} key Cache key name
 */
const remove = (key) => cache.remove(key);

/**
 * Check for cache to exist
 * @param {string} key Cache key name to check
 */
const has = async (key) => cache.has(key);

module.exports = {
  get,
  set,
  remove,
  put,
  has,
};
