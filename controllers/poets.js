const Poet = require('../models/poet');

function poetsIndex(req, res) {
  Poet
    .find()
    .exec()
    .then(poets => {
      res.render('poets/index', { poets });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function poetsShow(req, res) {
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

function poetsNew(req, res) {
  res.render('poets/new');
}

function poetsCreate(req, res) {
  Poet
    .create(req.body)
    .then(() => {
      res.redirect('/poets');
    });
}

module.exports = {
  index: poetsIndex,
  show: poetsShow,
  new: poetsNew,
  create: poetsCreate
};
