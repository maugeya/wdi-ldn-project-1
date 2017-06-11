const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');

}

function createRoute(req, res, next) {
  User
    .create(req.body)
    .then(() => res.redirect('/login'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/register', err.toString());
      next(err);

      console.log(req.body);
    });
}

function showRoute(req, res) {
  return res.render('registrations/show');
}

function editRoute(req, res) {
  return res.render('registrations/edit');
}

function updateRoute(req, res, next) {
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

function deleteRoute(req, res, next) {
  req.user
    .remove()
    .then(() => {
      req.session.regenerate(() => res.unauthorized('/', 'Your account has been deleted'));
    })
    .catch(next);
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  delete: deleteRoute,
  edit: editRoute,
  update: updateRoute
};
