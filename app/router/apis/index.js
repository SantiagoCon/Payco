let Router = require('express').Router;

let user = require('./user').router
let administrative = require('./administrative').router

const router = Router();

router.use('/user', user)
router.use('/administrative', administrative)

exports.router = router;
