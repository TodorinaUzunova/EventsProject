const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.events.get);

router.get('/:id', controllers.events.get);

router.post('/', auth(), controllers.events.post);

router.put('/:id', auth(), controllers.events.put);

router.delete('/:id', auth(), controllers.events.delete);

module.exports = router;