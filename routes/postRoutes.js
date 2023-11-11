const express = require('express');
const router = express.Router();

const { createPost, getAllPosts, searchPosts, getPost } = require('../controllers/postController.js');

router.post('/create', createPost);

router.get('/', getAllPosts);

router.get('/search', searchPosts)

router.get('/:id', getPost);


module.exports = router;