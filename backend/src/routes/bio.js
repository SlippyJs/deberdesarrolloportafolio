import express from 'express';
import { body } from 'express-validator';
import { getBio, updateBio } from '../controllers/bioController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/bio
 * @desc    Obtener información biográfica
 * @access  Public
 */
router.get('/', getBio);

/**
 * @route   PUT /api/bio
 * @desc    Actualizar información biográfica
 * @access  Private/Admin
 */
router.put(
  '/',
  authMiddleware,
  adminMiddleware,
  [
    body('firstName', 'Nombre requerido').trim().notEmpty(),
    body('lastName', 'Apellido requerido').trim().notEmpty(),
    body('email', 'Email inválido').isEmail(),
    body('phone', 'Teléfono requerido').trim().notEmpty(),
    body('location', 'Ubicación requerida').trim().notEmpty(),
    body('about', 'Descripción requerida').trim().isLength({ min: 10 }),
  ],
  updateBio
);

export default router;
