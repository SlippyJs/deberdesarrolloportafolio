import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FiCalendar, FiUser, FiEye, FiArrowRight } from 'react-icons/fi';

export function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'Backend',
    'Frontend',
    'DevOps',
    'Seguridad',
    'Bases de Datos',
    'Otros',
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = selectedCategory ? { category: selectedCategory } : {};
        const response = await postsAPI.getAllPosts(params);
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Blog Técnico</h1>

        {/* Filtros de categoría */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {error && <div className="text-center text-red-600 mb-8">{error}</div>}

        {posts.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No hay posts disponibles en esta categoría
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="hover:text-blue-600 transition"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FiCalendar size={16} />
                    {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                  </div>
                  {post.author && (
                    <div className="flex items-center gap-1">
                      <FiUser size={16} />
                      {post.author.username}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <FiEye size={16} />
                    {post.viewCount} vistas
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Leer más <FiArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
