let Router = require('express').Router;

let administrativeRouter = require('./administrative').router;
let userRouter = require('./user').router;

const router = Router();

router.use( userRouter);
router.use('/administrative', administrativeRouter);
exports.router = router;
