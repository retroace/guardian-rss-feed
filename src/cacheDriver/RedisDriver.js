const redis = require('redis');
const loggerService = require('../services/loggerService');

const client = redis.createClient({
  port: 6379,
  host: 'guardian_cache',
});

client.on('error', (error) => {
  loggerService.log(error);
});



/**
 * Cache object always takes time in seconds
 *
 * @method has     Checks for cache key
 * @method set     Sets cache
 * @method get     Gets cache from driver
 * @method remove  Deletes cache
 * @method put     Updates cache
 * @method close   Closes cache driver
 * @method client  Exposes driver instance
 */
 module.exports = {
  has: async (key) => new Promise((resolve) => {
    client.get(key, (err, data) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(data != null);
    });
  }),

  set: (key, value, time = 60) => {
    client.setex(key, time, value);
  },

  get: (key) => new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  }),

  remove: (key) => {
    client.del(key);
  },

  put: (key, value, time) => {
    client.setex(key, time, value);
  },

  close : () => {
    client.quit();
  },

  client,
};

