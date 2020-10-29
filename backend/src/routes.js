const express = require('express');
const routes = new express.Router();
const uploadConfig = require('./config/upload');
const multer = require('multer');
const PostController = require('./controllers/PostController')
const LikeController = require('./controllers/LikeController')

const upload = multer(uploadConfig);


// Criando uma rota para aplicação
routes.get('/posts', PostController.index);
routes.post('/posts',upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
module.exports = routes;