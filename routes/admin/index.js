const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const faker = require('faker');

router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});
router.get('/',(req,res)=>{
    res.render('admin/index'); // renders admin/index.handlebars
});

router.post('/generate-fake-posts', (req,res)=>{
    for(let i=0; i <= req.body.amount; i++){
        let post = new Post();
            post.title = faker.name.title();
            post.body = faker.lorem.sentence();;
            post.status = 'public';
            post.allowComments = faker.random.boolean();
            
            post.save().then(savedPost=>{
                res.redirect('/admin/posts');

            }).catch(err=>console.log(err));

    };
});

module.exports = router;
