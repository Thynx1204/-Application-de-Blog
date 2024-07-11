const express = require('express');
const Blog = require('../models/Blog');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const blogRouter = express.Router();

// Créer un article
blogRouter.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    const newBlog = new Blog({ title, content, author: req.user.id });
    await newBlog.save();
    res.status(201).send('Blog created');
});

// Lire tous les articles
blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
});

// Mettre à jour un article
blogRouter.put('/:id', authMiddleware, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id) return res.status(403).send('Access denied');
    Object.assign(blog, req.body);
    await blog.save();
    res.send('Blog updated');
});

// Supprimer un article
blogRouter.delete('/:id', authMiddleware, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog.author.toString() !== req.user.id) return res.status(403).send('Access denied');
    await blog.deleteOne();
    res.send('Blog deleted');
});

// Gérer les articles par un administrateur
blogRouter.delete('/admin/:id', [authMiddleware, adminMiddleware], async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    await blog.deleteOne();
    res.send('Blog deleted by admin');
});

module.exports = blogRouter;
