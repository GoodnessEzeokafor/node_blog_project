const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const {isEmpty, uploadDir} = require('../../helpers/upload_helper');
const fs = require('fs');
const path = require('path');


router.all('/*',(req,res,next)=>{
    req.app.locals.layout = 'admin';
    next();
});



router.get('/',(req,res)=>{
    Post.find({}).then(posts=>{
        res.render('admin/posts',{posts: posts});  
    }).catch(err => {
        console.log('Could Not Query From The Database',err);
    });
});

router.get('/create',(req,res)=>{
    res.render('admin/posts/create');
});

router.post('/create',(req,res)=>{
    let filename = '';
    if(!isEmpty(req.files)){

    let file = req.files.file;
    filename =Date.now() + '-' + file.name;
    // logic for allowComment form
    file.mv(uploadDir + filename, (err)=>{
        if(err) throw err;
    });
};



    let allowComments = true;
  
    if(req.body.allowComments) {
  
        allowComments =true;
  
    }else{
  
        allowComments = false;
  
    }


    const newPost = new Post({
        
        title: req.body.title,
        status: req.body.status,
        body: req.body.body,
        file:filename,
        allowComments: allowComments
    });
    // save to mongo db
    newPost.save().then(savedPost=>{
    
        res.redirect('/admin/posts');
    
    }).catch(err=>{
        
        console.log('could not save post',err);

    });
});
router.get('/edit/:id',(req,res)=>{
    // res.send(req.params.id);
    Post.findOne({_id:req.params.id}).then(post=>{
        res.render('admin/posts/edit',{post:post});
    });
    // res.render('admin/posts/edit');
});

router.put('/edit/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        let allowComments = true;
        if(req.body.allowComments) {
            allowComments =true;
        }else{
            allowComments = false;
        }
        post.title = req.body.title;
        post.status = req.body.status;
        post.body = req.body.body;
        post.allowComments = allowComments;

        post.save().then(updatePost=>{
            res.redirect('/admin/posts');
        })
        

    });

});
router.delete('/:id',(req,res)=>{
    Post.findOne({_id:req.params.id})
        .then(post=>{
            fs.unlink(uploadDir + post.file, (err)=>{
            post.remove();
            res.redirect('/admin/posts'); 
            });
        });
});

module.exports = router;

