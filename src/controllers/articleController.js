const fetch = require('node-fetch');
const { search } = require('../services/apiService');
const convertToXML = require('../transformer/xmlTransformer');
const Cache = require('./../services/cacheService');

const allSections = [
  "about","animals-farmed","artanddesign","australia-news","better-business","books","business","business-to-business","cardiff","childrens-books-site","cities","commentisfree","community","crosswords","culture","culture-network","culture-professionals-network","edinburgh","education","enterprise-network","environment","extra","fashion","film","food","football","games","global-development","global-development-professionals-network","government-computing-network","guardian-professional","healthcare-network","help","higher-education-network","housing-network","inequality","info","jobsadvice","katine","law","leeds","lifeandstyle","local","local-government-network","media","media-network","membership","money","music","news","politics","public-leaders-network","science","search","small-business-network","social-care-network","social-enterprise-network","society","society-professionals","sport","stage","teacher-network","technology","theguardian","theobserver","travel","travel/offers","tv-and-radio","uk-news","us-news","voluntary-sector-network","weather","women-in-leadership","working-in-development","world"
];

const index = async (req, res ) => {
  const { subject } = req.params;
  const { page } = req.query;

  if(!allSections.includes(subject)) {
    return res.status(404).json({
      message : "Not Found"
    });
  }

  // Cache.set(req.params.subject, data, 10);
  let pageNo = page || 1;
  let data = await search({
    section: subject,
    page: pageNo
  });

  let cacheKey = subject+"_"+pageNo;
  Cache.set(cacheKey, JSON.stringify(data), 600);

  return res.status(200).set('Content-Type', 'text/xml').send(convertToXML(data, {
    title: subject.toUpperCase() + " | The Guardian",
    description: subject,
    link: '#'
  }));
}


module.exports = {
  index: index
};
