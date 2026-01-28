import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['Backend', 'Frontend', 'DevOps', 'Seguridad', 'Bases de Datos', 'Otros'],
      default: 'Otros',
    },
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
