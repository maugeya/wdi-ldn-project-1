const rp = require('request-promise');

function wikipediaProxy(req, res) {
  rp({
    url: 'https://en.wikipedia.org/w/api.php',
    method: 'GET',
    qs: {
      action: 'query',
      titles: req.query.name,
      prop: 'info',
      format: 'json'
    },
    json: true
  })
  .then((data) => {
    res.json(data);
  });
}

module.exports = {
  proxy: wikipediaProxy
};
