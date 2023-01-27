"use strict";
const blogRouter = require('express').Router();
const Blog = require('../Schemas/mongo');
const apiCheck = require('../utils/fortesting');
blogRouter.post('/blog', (req, res, next) => {
    console.log('just=>', req.body.title, req.body.author, req.body.url, req.body.likes);
    let blog = new Note({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
    });
    blog
        .save()
        .then((data) => {
        res.json(data);
        console.log(data);
    })
        .catch((err) => next(err));
});
//For get request i add some path like i was using /blog then i used blog/list code greeper
blogRouter.get('/blog/list', (req, res, next) => {
    console.log('hello...............');
    //  console.log(req);
    Blog.find({})
        .then((data) => {
        if (data) {
            console.log('data=>', data);
            res.json(data);
        }
        else {
            res.status(404).send('error');
        }
    })
        .catch((err) => next(err));
});
module.exports = blogRouter;
