const rp = require('request-promise');
const oauth = require('../config/oauth');
const User = require('../models/user');

function facebook(req, res, next) {
  return rp({
    method: 'GET',
    url: oauth.facebook.accessTokenURL,
    qs: {
      client_id: oauth.facebook.client_id,
      redirect_uri: oauth.facebook.redirect_uri,
      client_secret: oauth.facebook.client_secret,
      code: req.query.code
    },
    json: true
  })
  .then((token) => {
    return rp({
      method: 'GET',
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture.height(100)',
      qs: token,

      json: true
    });
  })
  .then((profile) => {
    console.log(profile);
    return User.findOne({$or: [{ email: profile.email }, { facebookId: profile.id }]})
    .then((user) => {
      if(!user) {
        user = new User({
          username: profile.name,
          email: profile.email
        });
      }
      user.facebookId = profile.id;
      user.image = profile.picture.data.url;
      return user.save();
    });
  })
  .then((user) => {
    req.session.userId = user.id;
    req.session.isAuthenticated = true;
    req.flash('info', `welcome back ${user.username}`);
    res.redirect('/artists');
  })
  .catch(next);
}

module.exports = {
  facebook
};
