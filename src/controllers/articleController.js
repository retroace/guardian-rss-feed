const { search } = require('../services/apiService');
const convertToXML = require('../transformer/xmlTransformer');
const Cache = require('../services/cacheService');

/**
 * Extracted from sections api
 * @docs https://content.guardianapis.com/sections?api-key=
 */
const allSections = [
  'about', 'animals-farmed', 'artanddesign', 'australia-news', 'better-business', 'books', 'business', 'business-to-business', 'cardiff', 'childrens-books-site', 'cities', 'commentisfree', 'community', 'crosswords', 'culture', 'culture-network', 'culture-professionals-network', 'edinburgh', 'education', 'enterprise-network', 'environment', 'extra', 'fashion', 'film', 'food', 'football', 'games', 'global-development', 'global-development-professionals-network', 'government-computing-network', 'guardian-professional', 'healthcare-network', 'help', 'higher-education-network', 'housing-network', 'inequality', 'info', 'jobsadvice', 'katine', 'law', 'leeds', 'lifeandstyle', 'local', 'local-government-network', 'media', 'media-network', 'membership', 'money', 'music', 'news', 'politics', 'public-leaders-network', 'science', 'search', 'small-business-network', 'social-care-network', 'social-enterprise-network', 'society', 'society-professionals', 'sport', 'stage', 'teacher-network', 'technology', 'theguardian', 'theobserver', 'travel', 'travel/offers', 'tv-and-radio', 'uk-news', 'us-news', 'voluntary-sector-network', 'weather', 'women-in-leadership', 'working-in-development', 'world'
];

/**
 *
 * Fetch content from api
 *
 * @param {obj} req Request instance of express
 * @param {obj} res Response instance of express
 * @returns {res}
 */
const index = async (req, res) => {
  const { subject } = req.params;
  const { page } = req.query;

  if (!allSections.includes(subject)) {
    return res.status(404).json({
      message: 'Not Found',
    });
  }

  const pageNo = page || 1;
  const data = await search({
    section: subject,
    page: pageNo,
  });


  const cacheKey = `${subject}_${pageNo}`;
  let rssDataType = {
    header: {
      title: `${subject.toUpperCase()} | The Guardian`,
      description: subject,
      link: process.env.RSS_FEED_HOME_URL,
      home_page_url: process.env.RSS_FEED_HOME_URL,
      feed_url: `${process.env.RSS_FEED_BASE_URL}/${subject}?page=${pageNo}`,
      status: data.response.status,
      userTier: data.response.userTier,
      total: data.response.total,
    },
    item: mapArrayToRssFormat(data.response.results)
  };

  Cache.set(cacheKey, JSON.stringify(rssDataType), 600);
  const xml = convertToXML({item: rssDataType.item}, rssDataType.header);

  return res.status(200).set('Content-Type', 'text/xml').send(xml);
};


/**
 *
 * @param {obj} res JSON array map to rss format
 * @returns
 */
function mapArrayToRssFormat(res)
{
  return Object.values(res).map(item => {
    let body = removeTags(item.fields.body, 'iframe');
    body = removeTags(body, 'figcaption');

    return {
      "title": item.fields.headline,
      "description": "<![CDATA["+body+"]]>",
      "link": item.webUrl,
      "pubDate": transformRssPubDay(item.webPublicationDate)
    };
  })
}

/**
 * Generates rss timeformat
 *
 * @param {string} date Timestamp or js time for parsing
 * @returns
 */
function transformRssPubDay(date)
{
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  date = new Date(date);
  let day = days[date.getDay()];

  //Rss format Day, Date Month Year H:m:s timeZone
  return `${day}, ${date.toISOString().substr(5,2)} ${monthName[date.getMonth()]} ${date.getFullYear()} ${date.toISOString().substr(11,8)} UTC`;
}


/**
 * Remove specified tag from string
 *
 * @param {string} string Html string
 * @param {string} tag Tag name to remove from string
 * @returns
 */
function removeTags(string,tag)
{
  let find = true;
  while(find) {
    let startIframe = string.indexOf(`<${tag}`);
    if(startIframe === -1) {
      find = false;
      continue;
    }
    let endIframe = string.indexOf(`</${tag}>`);
    string = string.substr(0, startIframe) + string.substr(endIframe+tag.length+4, string.length);
  }
  return string;
}

module.exports = {
  index,
};
