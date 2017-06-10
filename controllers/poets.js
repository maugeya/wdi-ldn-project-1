const Poet = require('../models/poet');

// function indexRoute(req, res) {
//   Poet
//     .find()
//     .exec()
//     .then(poets => {
//       res.render('poets/index', { poets });
//     })
//     .catch(err => {
//       res.status(500).render('error', { error: err });
//     });
// }

function indexRoute(req, res, next) {
  Poet
  .find()
  .populate('createdBy')
  .exec()
  .then((poets) => res.render('poets/index', { poets }))
  .catch(next);
}

function showRoute(req, res) {
  Poet
    .findById(req.params.id)
    .exec()
    .then(poet => {
      if (!poet) return res.status(404).render('error', { error: 'No Poet found'});
      res.render('poets/show', { poet });
    })
    .catch(err => {
      res.status(500).render('error', { error: err});
    });
}

function newRoute(req, res) {
  res.render('poets/new');
}

function createRoute(req, res) {
  Poet
    .create(req.body)
    .then(() => {
      res.redirect('/poets');
    });
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute
};
