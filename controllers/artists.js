const Artist = require('../models/artist');

const categories = [
  'musician',
  'poet',
  'author',
  'actress'
];

function artistsIndex(req, res, next) {
  Artist
  .find()
  .populate('createdBy')
  .exec()
  .then((artists) => res.render('artists/index', { artists }))
  .catch(next);
}

function artistsShow(req, res) {
  Artist
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(artist => {
      if (!artist) return res.status(404).render('error', { error: 'No Artist found'});
      res.render('artists/show', { artist });
    })
    .catch(err => {
      res.status(500).render('error', { error: err});
    });
}

function artistsNew(req, res) {
  res.render('artists/new', { categories });
}

function artistsCreate(req, res, next) {

  req.body.createdBy = req.user;
  if(req.file) req.body.image = req.file.key;

  Artist
    .create(req.body)
    .then(() => res.redirect('/artists'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/artists/new', err.toString());
      next(err);
    });
}

function artistsEdit(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.redirect();
      if(!artist.belongsTo(req.user)) return res.unauthorized(`/artists/${artist.id}`, 'You do not have permission to edit that resource');
      return res.render('artists/edit', { artist, categories });
    })
    .catch(next);
}

function artistsUpdate(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.redirect();
      if(!artist.belongsTo(req.user)) return res.unauthorized(`/artists/${artist.id}`, 'You do not have permission to edit that resource');

      for(const field in req.body) {
        artist[field] = req.body[field];
      }

      return artist.save();
    })
    .then(() => res.redirect(`/artists/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/artists/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function artistsDelete(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.redirect();
      if(!artist.belongsTo(req.user)) return res.unauthorized(`/artists/${artist.id}`, 'You do not have permission to edit that resource');
      return artist.remove();
    })
    .then(() => res.redirect('/artists'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;


  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.NotFound();

      artist.comments.push(req.body);
      return artist.save();

    })
    .then((artist) =>
    res.redirect(`/artists/${artist.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();

      const comment =
      artist.comments.id(req.params.commentId);
      comment.remove();
      return artist.save();
    })
    .then((artist) =>
    res.redirect(`/artists/${artist.id}`))
    .catch(next);
}

function editCommentRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.redirect();
      if(!artist.belongsTo(req.user)) return res.unauthorized(`/artists/${artist.id}`, 'You do not have permission to edit that resource');

      const comment = artist.comments.id(req.params.commentId);

      return res.render('artists/comments/edit', { artist, comment });
    })
    .catch(next);
}

function updateCommentRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      if(!artist.belongsTo(req.user)) return res.unauthorized(`/artists/${artist.id}`, 'You do not have permission to edit that resource');
      const comment = artist.comments.id(req.params.commentId);

      for(const field in req.body) {
        comment[field] = req.body[field];
      }

      return artist.save();
    })
    .then(() => res.redirect(`/artists/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/artists/${req.params.id}/edit`, err.toString());
      next(err);
    });
}







module.exports = {
  index: artistsIndex,
  show: artistsShow,
  new: artistsNew,
  create: artistsCreate,
  edit: artistsEdit,
  update: artistsUpdate,
  delete: artistsDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  editComment: editCommentRoute,
  updateComment: updateCommentRoute
};
