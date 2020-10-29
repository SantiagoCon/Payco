let Router = require('express').Router;
let webServices = require('../../service/web_services');


const router = Router();


router.get('/', (req, res) => {
  res.render('pages/left-sidebar');
});

exports.router = router;

