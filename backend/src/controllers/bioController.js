import Bio from '../models/Bio.js';
import { validationResult } from 'express-validator';

export const getBio = async (req, res, next) => {
  try {
    let bio = await Bio.findOne();
    if (!bio) {
      // Crear un bio predeterminado si no existe
      bio = new Bio({
        firstName: 'Juan Carlos',
        lastName: 'Banda Guamán',
        email: 'juanitoalcachofaa_100@outlook.com',
        phone: '+593 962782992',
        location: 'Quito, Ecuador',
        about: 'Estudiante apasionado de desarrollo de software con enfoque en crear soluciones tecnológicas con impacto social.',
        skills: [
          { name: 'Python', level: 'Intermedio' },
          { name: 'HTML/CSS', level: 'Avanzado' },
          { name: 'SQL Server', level: 'Intermedio' },
          { name: 'JavaScript', level: 'Intermedio' },
          { name: 'React', level: 'Intermedio' },
        ],
        experience: [
          {
            company: 'Proyectos Personales',
            position: 'Desarrollador Full Stack',
            description: 'Desarrollo de validador de cédulas y casino virtual con juego responsable',
            startDate: new Date('2024-01-01'),
            isCurrentRole: true,
          },
        ],
        education: [
          {
            institution: 'Unidad Educativa Sur Quito',
            degree: 'Bachiller',
            field: 'Ciencias',
            endDate: new Date('2023-06-01'),
            isCurrentStudy: false,
          },
          {
            institution: 'Pontificia Universidad Católica del Ecuador',
            degree: 'Tecnólogo',
            field: 'Desarrollo de Software',
            startDate: new Date('2024-01-01'),
            isCurrentStudy: true,
          },
        ],
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
      });
      await bio.save();
    }
    res.json(bio);
  } catch (error) {
    console.error('Error en getBio:', error);
    next(error);
  }
};

export const updateBio = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let bio = await Bio.findOne();
    if (!bio) {
      bio = new Bio(req.body);
    } else {
      Object.assign(bio, req.body);
    }

    await bio.save();
    res.json({ message: 'Perfil actualizado exitosamente', bio });
  } catch (error) {
    next(error);
  }
};
