const fetch = require('node-fetch');

function generateParams(params) {
  return Object.keys(params).map((param) => `${param}=${params[param]}`).join('&');
}

const search = async (data) => {
  const ApiKey = process.env.GUARDIAN_API_KEY;
  const params = generateParams(data);

  const resData = await fetch(`https://content.guardianapis.com/search?${params}&api-key=${ApiKey}&show-fields=all`).then((res) => res.json());
  return resData;
};

module.exports = {
  search,
};
