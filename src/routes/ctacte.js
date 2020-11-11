const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/mainmenu', isLoggedIn, async (req, res, next) => {
    res.render('ctacte/mainmenu');
});

router.get('/cuotes', isLoggedIn, async (req, res, next) => {
    res.render('ctacte/cuotes');
});
router.get('/cuotes/load', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/cuotes/load');
});
router.get('/cuotes/query', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/cuotes/query');
});
router.get('/print', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/print');
});
router.get('/currAco', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/currAco');
});
router.get('/listdebt', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/listdebt');
});
router.get('/recalcv', isLoggedIn, async (req, res, next) =>{
    res.render('ctacte/recalcv');
});

module.exports = router;