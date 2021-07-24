/* eslint-disable */
/**
 *
 * @param {JSON} jsonObj convert jsonObj to xml format
 * @returns {string} xml string
 */
const convert = (obj) => {
  var xml = '';
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += convert(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += convert(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
  return xml
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
  xml += `${convert(header)}`;
  xml += `${convert(jsonObj)}</channel></rss>`;
  return xml;
};

module.exports = convertToXML;
