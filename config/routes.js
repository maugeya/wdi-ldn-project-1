const router = require('express').Router();
const poetsController = require('../controllers/poets');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const upload = require('../lib/upload');



router.get('/', (req, res) => res.render('index'));

router.route('/poets')
  .get(poetsController.index)
  .post(secureRoute, upload.single('image'), poetsController.create);

router.route('/poets/new')
    .get(secureRoute, poetsController.new);


router.route('/poets/:id')
  .get(poetsController.show)
  .put(secureRoute, upload.single('image'), poetsController.update)
  .delete(secureRoute, poetsController.delete);


router.route('/poets/:id/edit')
    .get(secureRoute, upload.single('image'), poetsController.edit);

router.route('/users/:id/')
    .get(secureRoute, usersController.show)
    .post(upload.single('image'), usersController.update)
    .delete(secureRoute, usersController.delete);


router.route('/users/:id/edit')
      .get(secureRoute, upload.single('image'), usersController.edit);

router.route('/register')
    .get(upload.single('image'), registrationsController.new)
    .post(upload.single('image'), registrationsController.create);

router.route('/profile')
    .get(secureRoute, registrationsController.show)
    .put(secureRoute, upload.single('image'), registrationsController.update)
    .delete(secureRoute, registrationsController.delete);

router.route('/profile/edit')
    .get(secureRoute, upload.single('image'), registrationsController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/poets/:id/comments')
    .post(secureRoute, poetsController.createComment);

router.route('/poets/:id/comments/:commentId')
  .put(secureRoute, poetsController.updateComment)
  .delete(secureRoute, poetsController.deleteComment);

router.route('/poets/:id/comments/:commentId/edit')
    .get(secureRoute, poetsController.editComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
