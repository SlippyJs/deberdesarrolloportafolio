import express from 'express';
import { body } from 'express-validator';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getAdminPosts,
} from '../controllers/postController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/posts
 * @desc    Obtener todos los posts publicados
 * @access  Public
 */
router.get('/', getAllPosts);

/**
 * @route   GET /api/posts/:slug
 * @desc    Obtener un post específico por slug
 * @access  Public
 */
router.get('/:slug', getPostBySlug);

/**
 * @route   GET /api/posts/admin/my-posts
 * @desc    Obtener posts del usuario autenticado
 * @access  Private
 */
router.get('/admin/my-posts', authMiddleware, getAdminPosts);

/**
 * @route   POST /api/posts
 * @desc    Crear un nuevo post
 * @access  Private
 */
router.post(
  '/',
  authMiddleware,
  [
    body('title', 'Título requerido').trim().notEmpty(),
    body('content', 'Contenido debe tener al menos 100 caracteres').isLength({ min: 100 }),
    body('excerpt', 'Extracto requerido').trim().notEmpty(),
    body('category', 'Categoría inválida').isIn([
      'Backend',
      'Frontend',
      'DevOps',
      'Seguridad',
      'Bases de Datos',
      'Otros',
    ]),
  ],
  createPost
);

/**
 * @route   PUT /api/posts/:id
 * @desc    Actualizar un post
 * @access  Private
 */
router.put(
  '/:id',
  authMiddleware,
  [
    body('title', 'Título requerido').trim().notEmpty(),
    body('content', 'Contenido debe tener al menos 100 caracteres').isLength({ min: 100 }),
    body('excerpt', 'Extracto requerido').trim().notEmpty(),
    body('category', 'Categoría inválida').isIn([
      'Backend',
      'Frontend',
      'DevOps',
      'Seguridad',
      'Bases de Datos',
      'Otros',
    ]),
  ],
  updatePost
);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Eliminar un post
 * @access  Private
 */
router.delete('/:id', authMiddleware, deletePost);

export default router;
