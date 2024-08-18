exports.redirect = (req, res) => {
  req.session.accessToken = req.query.access_token;
  req.session.refreshToken = req.query.refresh_token;
  req.session.tokenExpiry = Date.now() + 3600 * 1000;
  console.log(req.session.accessToken);
  res.render('redirect');
};
