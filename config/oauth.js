module.exports = {
  facebook: {
    login_url: 'https://www.facebook.com/v2.9/dialog/oauth',
    client_id: process.env.FACEBOOK_APP_ID,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    accessTokenURL: 'https://graph.facebook.com/v2.9/oauth/access_token',
    redirect_uri: process.env.NODE_ENV === 'production' ? 'https://ancient-dusk-97846.herokuapp.com/oauth/facebook' : 'http://localhost:8000/oauth/facebook',
    scope: 'email',
    getLoginURL() {
      return `${this.login_url}?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=${this.scope}`;
    }
  }
};
