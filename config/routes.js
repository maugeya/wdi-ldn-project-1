const router = require('express').Router();
const poetsController = require('../controllers/poets');
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const usersController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');



router.get('/', (req, res) => res.redirect('/poets'));

router.route('/poets')
  .get(poetsController.index)
  .post(secureRoute, poetsController.create);

router.route('/poets/new')
    .get(secureRoute, poetsController.new);


router.route('/poets/:id')
  .get(poetsController.show)
  .put(secureRoute, poetsController.update)
  .delete(secureRoute, poetsController.delete);

router.route('/poets/:id/edit')
    .get(secureRoute, poetsController.edit);

router.route('/users/:id/')
    .get(secureRoute, usersController.show)
    .post(usersController.update)
    .delete(secureRoute, usersController.delete);

router.route('/users/:id/edit')
      .get(secureRoute, usersController.edit);

router.route('/register')
    .get(registrationsController.new)
    .post(registrationsController.create);

router.route('/profile')
    .get(secureRoute, registrationsController.show)
    .put(secureRoute, registrationsController.update)
    .delete(secureRoute, registrationsController.delete);

router.route('/profile/edit')
    .get(secureRoute, registrationsController.edit);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
