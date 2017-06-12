const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registrations/new');
}

function registrationsCreate(req, res, next) {

  if(req.file) req.body.image = req.file.key;

  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);

    });
}

function registrationsShow(req, res) {
  return res.render('registrations/show');
}

function registrationsEdit(req, res) {
  return res.render('registrations/edit');
}

function registrationsUpdate(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  console.log(req.user);
  req.user.save()


    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/profile/edit', err.toString());
      }
      next(err);

    });
}

function registrationsDelete(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate,
  show: registrationsShow,
  delete: registrationsDelete,
  edit: registrationsEdit,
  update: registrationsUpdate
};
