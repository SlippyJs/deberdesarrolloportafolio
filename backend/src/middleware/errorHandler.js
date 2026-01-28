export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Errores de validación de Mongoose
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Error de validación', errors: messages });
  }

  // Errores de duplicación de índices
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ message: `El ${field} ya está registrado` });
  }

  // Errores JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Token inválido' });
  }

  // Error genérico
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
