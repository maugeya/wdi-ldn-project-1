const router = require('express').Router();
const artistsController = require('../controllers/artists');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');
const wikipediaController = require('../controllers/wikipedia');



router.get('/', (req, res) => res.render('index'));

router.get('/wikipedia', wikipediaController.proxy);

router.route('/artists')
  .get(artistsController.index)
  .post(secureRoute, upload.single('image'), artistsController.create);

router.route('/artists/new')
    .get(secureRoute, artistsController.new);


router.route('/artists/:id')
  .get(artistsController.show)
  .put(secureRoute, upload.single('image'), artistsController.update)
  .delete(secureRoute, artistsController.delete);


router.route('/artists/:id/edit')
    .get(secureRoute, upload.single('image'), artistsController.edit);

router.route('/users/:id')
    .get(secureRoute, usersController.show)
    .post(secureRoute, upload.single('image'), usersController.update)
    .delete(secureRoute, usersController.delete);


router.route('/users/:id/edit')
      .get(secureRoute, upload.single('image'), usersController.edit);

router.route('/register')
    .get(upload.single('image'), registrationsController.new)
    .post(upload.single('image'), registrationsController.create);


router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/oauth/facebook')
  .get(oauth.facebook);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/artists/:id/comments')
    .post(secureRoute, artistsController.createComment);

router.route('/artists/:id/comments/:commentId')
  .put(secureRoute, artistsController.updateComment)
  .delete(secureRoute, artistsController.deleteComment);

router.route('/artists/:id/comments/:commentId/edit')
    .get(secureRoute, artistsController.editComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
