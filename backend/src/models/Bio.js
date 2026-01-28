import mongoose from 'mongoose';

const bioSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: 'https://via.placeholder.com/200',
    },
    skills: [
      {
        name: String,
        level: {
          type: String,
          enum: ['Básico', 'Intermedio', 'Avanzado'],
        },
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        description: String,
        startDate: Date,
        endDate: Date,
        isCurrentRole: Boolean,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        startDate: Date,
        endDate: Date,
        isCurrentStudy: Boolean,
      },
    ],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Bio', bioSchema);
