/* eslint-disable */
/**
 *
 * @param {JSON} jsonObj convert jsonObj to xml format
 * @returns {string} xml string
 */
const convert = (jsonObj) => {
  let xml = '';
  // eslint-disable-next-line no-restricted-syntax guard-for-in
  for (const prop in jsonObj) {
    xml += `<${prop}>`;
    if (Array.isArray(jsonObj[prop])) {
      for (const array of jsonObj[prop]) {
        xml += `</${prop}>`;
        xml += `<${prop}>`;

        xml += convert(new Object(array));
      }
    } else if (typeof jsonObj[prop] === 'object') {
      xml += convert(new Object(jsonObj[prop]));
    } else {
      xml += jsonObj[prop];
    }
    xml += `</${prop}>`;
  }
  xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml;
};
/* eslint-enable */

/**
 *
 * @param {JSON} jsonObj Body to add in response
 * @param {JSON} header Header to add in response
 * @returns {string} xml string
 */
const convertToXML = (jsonObj, header = {}) => {
  let xml = '<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel>';
  xml += `${convert(header)}<item>`;
  xml += `${convert(jsonObj)}</item></channel></rss>`;
  return xml;
};

module.exports = convertToXML;
