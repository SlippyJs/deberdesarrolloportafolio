import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Public
 */
router.post(
  '/register',
  [
    body('username', 'El nombre de usuario es requerido').trim().isLength({ min: 3 }),
    body('email', 'Email inválido').isEmail(),
    body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  ],
  registerUser
);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post(
  '/login',
  [
    body('email', 'Email inválido').isEmail(),
    body('password', 'Contraseña requerida').exists(),
  ],
  loginUser
);

/**
 * @route   GET /api/auth/profile
 * @desc    Obtener perfil del usuario autenticado
 * @access  Private
 */
router.get('/profile', authMiddleware, getProfile);

export default router;
