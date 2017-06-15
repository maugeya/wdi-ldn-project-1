const Poet = require('../models/poet');

function poetsIndex(req, res, next) {
  Poet
  .find()
  .populate('createdBy')
  .exec()
  .then((poets) => res.render('poets/index', { poets }))
  .catch(next);
}

function poetsShow(req, res) {
  Poet
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
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

function poetsCreate(req, res, next) {

  req.body.createdBy = req.user;
  if(req.file) req.body.image = req.file.key;

  Poet
    .create(req.body)
    .then(() => res.redirect('/poets'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/poets/new', err.toString());
      next(err);
    });
}

function poetsEdit(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.redirect();
      if(!poet.belongsTo(req.user)) return res.unauthorized(`/poets/${poet.id}`, 'You do not have permission to edit that resource');
      return res.render('poets/edit', { poet });
    })
    .catch(next);
}

function poetsUpdate(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.redirect();
      if(!poet.belongsTo(req.user)) return res.unauthorized(`/poets/${poet.id}`, 'You do not have permission to edit that resource');

      for(const field in req.body) {
        poet[field] = req.body[field];
      }

      return poet.save();
    })
    .then(() => res.redirect(`/poets/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/poets/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function poetsDelete(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.redirect();
      if(!poet.belongsTo(req.user)) return res.unauthorized(`/poets/${poet.id}`, 'You do not have permission to edit that resource');
      return poet.remove();
    })
    .then(() => res.redirect('/poets'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;


  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.NotFound();

      poet.comments.push(req.body);
      return poet.save();

    })
    .then((poet) =>
    res.redirect(`/poets/${poet.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.notFound();

      const comment =
      poet.comments.id(req.params.commentId);
      comment.remove();
      return poet.save();
    })
    .then((poet) =>
    res.redirect(`/poets/${poet.id}`))
    .catch(next);
}

function editCommentRoute(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.redirect();
      if(!poet.belongsTo(req.user)) return res.unauthorized(`/poets/${poet.id}`, 'You do not have permission to edit that resource');

      const comment = poet.comments.id(req.params.commentId);

      return res.render('poets/comments/edit', { poet, comment });
    })
    .catch(next);
}

function updateCommentRoute(req, res, next) {
  Poet
    .findById(req.params.id)
    .exec()
    .then((poet) => {
      if(!poet) return res.notFound();
      if(!poet.belongsTo(req.user)) return res.unauthorized(`/poets/${poet.id}`, 'You do not have permission to edit that resource');
      const comment = poet.comments.id(req.params.commentId);

      for(const field in req.body) {
        comment[field] = req.body[field];
      }

      return poet.save();
    })
    .then(() => res.redirect(`/poets/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/poets/${req.params.id}/edit`, err.toString());
      next(err);
    });
}







module.exports = {
  index: poetsIndex,
  show: poetsShow,
  new: poetsNew,
  create: poetsCreate,
  edit: poetsEdit,
  update: poetsUpdate,
  delete: poetsDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  editComment: editCommentRoute,
  updateComment: updateCommentRoute
};
