const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res, next) {

  if(req.file) req.body.image = req.file.key;

  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login.`);
      res.redirect('/login');  
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);

    });
}



module.exports = {
  new: registrationsNew,
  create: registrationsCreate

};
