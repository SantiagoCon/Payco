let Router = require('express').Router;
let webServices = require('../../service/web_services');


const router = Router();



router.get('/', (req, res) => {
    res.render('pages/index');
});
router.get('/home', (req, res) => {
    res.render('pages/index');
});
router.get('/admin', (req, res) => {
    res.render('pages/admin');
});
router.get('/user', (req, res) => {
    res.render('pages/user');
});
router.get('/charge', (req, res) => {
    res.render('pages/charge');
});
router.get('/pay', (req, res) => {
    res.render('pages/pay');
});
router.get('/payFinish', (req, res) => {
    res.render('pages/payFinish');
});
exports.router = router;

