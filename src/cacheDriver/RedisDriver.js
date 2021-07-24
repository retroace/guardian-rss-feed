const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: 'guardian_cache'
});

client.on("error", function(error) {
  console.error(error);
});


const close = () => {
  client.quit();
};

const cache = {
  has: async (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err,data) => {
        if(err){
          reject(false);
          return
        }
        resolve(data != null);
      });
    })
  },

  set: (key,value,time) => {
    client.setex(key,time,value);
  },

  get: (key) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err,data) => {
        if(err){
          reject(err);
          return
        }
        resolve(data);
      });
    })
  },

  remove: (key) => {
    client.del(key);
  },

  put: (key,value,time) => {
    client.setex(key,time,value);
  },
  close: close,
  client: client
};

module.exports = cache;
