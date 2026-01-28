import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

// Generar slug desde título
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getAllPosts = async (req, res, next) => {
  try {
    const { category, featured, published } = req.query;
    const filter = { published: true };

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const posts = await Post.find(filter)
      .select('-content')
      .populate('author', 'username')
      .sort({ publishedAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug, published: true }).populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Incrementar contador de vistas
    post.viewCount += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, category, tags, featured } = req.body;
    const slug = generateSlug(title);

    // Verificar si el slug ya existe
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ message: 'Un post con este título ya existe' });
    }

    const newPost = new Post({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags || [],
      featured: featured || false,
      author: req.user.id,
      published: false,
    });

    await newPost.save();
    res.status(201).json({ message: 'Post creado exitosamente', post: newPost });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content, excerpt, category, tags, featured, published } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Verificar que sea el autor
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para editar este post' });
    }

    // Actualizar slug si el título cambió
    if (title && title !== post.title) {
      post.slug = generateSlug(title);
    }

    Object.assign(post, { title, content, excerpt, category, tags, featured });

    if (published && !post.published) {
      post.published = true;
      post.publishedAt = new Date();
    }

    await post.save();
    res.json({ message: 'Post actualizado exitosamente', post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    // Verificar que sea el autor o admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este post' });
    }

    await Post.findByIdAndDelete(id);
    res.json({ message: 'Post eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

export const getAdminPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user.id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};
