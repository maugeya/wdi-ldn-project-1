// const express = require('express');
// const router = express.Router();
const router = require('express').Router();

const poetsController = require('../controllers/poets');

router.get('/', (req, res) => res.redirect('/poets'));

router.route('/poets')
  .get(poetsController.index)
  .post(poetsController.create);

router.route('/poets/new')
    .get(poetsController.new);


router.route('/poets/:id')
  .get(poetsController.show);

module.exports = router;
