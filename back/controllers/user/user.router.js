'use strict';
const user = require('./user.controller');
const {
    Router
} = require('express');
const router = Router();

router.route('/').get(user.all).post(user.store);
router.route('/:id').get(user.get).put(user.edit).delete(user.delete).post(user.restore);

module.exports = router;