const express = require('express');
const router = express.Router();
// routes


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'home';
    next();
});

router.get('/',(req, res)=>{
    res.render('home/index'); // route for the home page
    // will lok in the views directory
});
router.get('/about',(req,res)=>{
    res.render('home/about'); // for the about page
});
router.get('/login',(req,res)=>{
    res.render('home/login'); // for the login page
});
router.get('/register',(req,res)=>{
    res.render('home/register'); // for the signup page
});

module.exports=router;