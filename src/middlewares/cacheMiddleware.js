const convertToXML = require('../transformer/xmlTransformer');
const Cache = require('../services/cacheService');

module.exports = async (req, res, next) => {
  const { subject } = req.params;
  const key = `${subject}_${req.query || 1}`;
  const hasCache = await Cache.has(key);

  if (!hasCache) {
    return next();
  }

  let data = await Cache.get(key);
  data = JSON.parse(data);
  return res.status(200).set('Content-Type', 'text/xml').send(convertToXML(data, {
    title: `${subject.toUpperCase()} | The Guardian`,
    description: subject,
    link: '#',
  }));
};
