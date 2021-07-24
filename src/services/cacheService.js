
let cache = null;

switch(process.env.CACHE_DRIVER) {

  case 'redis':
    cache = require('./../cacheDriver/RedisDriver');
    break;
  default:
    cache = require('./../cacheDriver/RedisDriver');
    break;
}


const get = async(key, fallbackData = null) => {
  return await cache.get(key);
}

const set = function(key, data, time = 600) {
  return cache.set(key, data, time);
}

const put = function(key, data, time = 600) {
  return cache.set(key, data, time);
}

const remove = function(key) {
  return cache.remove(key);
}

const has = async (key) => {
  const cacheExists = await cache.has(key);
  return cacheExists;
}


module.exports = {
  get,
  set,
  remove,
  put,
  has
};
