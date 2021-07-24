const convertToXML = require('../transformer/xmlTransformer');
const Cache = require('../services/cacheService');

module.exports = async (req, res, next) => {
  const { subject } = req.params;
  const key = `${subject}_${req.query.page || 1}`;
  const hasCache = await Cache.has(key);

  if (!hasCache) {
    return next();
  }

  let data = await Cache.get(key);
  data = JSON.parse(data);
  const xml = convertToXML({item: data.item}, data.header);
  return res.status(200).set('Content-Type', 'text/xml').send(xml);
};
