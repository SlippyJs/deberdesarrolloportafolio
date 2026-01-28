import { useState, useEffect } from 'react';
import { bioAPI, postsAPI } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FiEdit, FiPlus } from 'react-icons/fi';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('bio');
  const [bio, setBio] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estado para el formulario de bio
  const [bioForm, setBioForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    about: '',
  });

  // Estado para crear post
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Backend',
    tags: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bioRes, postsRes] = await Promise.all([
        bioAPI.getBio(),
        postsAPI.getAdminPosts(),
      ]);

      setBio(bioRes.data);
      setBioForm({
        firstName: bioRes.data.firstName || '',
        lastName: bioRes.data.lastName || '',
        email: bioRes.data.email || '',
        phone: bioRes.data.phone || '',
        location: bioRes.data.location || '',
        about: bioRes.data.about || '',
      });

      setPosts(postsRes.data);
    } catch (err) {
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleBioUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await bioAPI.updateBio(bioForm);
      setSuccessMessage('Perfil actualizado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      await loadData();
    } catch (err) {
      setError('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postsAPI.createPost({
        ...newPost,
        tags: newPost.tags.split(',').map((t) => t.trim()),
      });
      setSuccessMessage('Post creado exitosamente');
      setNewPost({ title: '', excerpt: '', content: '', category: 'Backend', tags: '' });
      setTimeout(() => setSuccessMessage(''), 3000);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear post');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !bio) return <LoadingSpinner />;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Panel de Administración</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {successMessage}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('bio')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bio'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Información Personal
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Blog Posts
            </button>
          </div>
        </div>

        {/* Bio Tab */}
        {activeTab === 'bio' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-6">Editar Información Personal</h2>
            <form onSubmit={handleBioUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    value={bioForm.firstName}
                    onChange={(e) => setBioForm({ ...bioForm, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Apellido</label>
                  <input
                    type="text"
                    value={bioForm.lastName}
                    onChange={(e) => setBioForm({ ...bioForm, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={bioForm.email}
                    onChange={(e) => setBioForm({ ...bioForm, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    value={bioForm.phone}
                    onChange={(e) => setBioForm({ ...bioForm, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ubicación</label>
                <input
                  type="text"
                  value={bioForm.location}
                  onChange={(e) => setBioForm({ ...bioForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <textarea
                  value={bioForm.about}
                  onChange={(e) => setBioForm({ ...bioForm, about: e.target.value })}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </form>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-8">
            {/* Crear nuevo post */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiPlus /> Crear nuevo post
              </h2>
              <form onSubmit={handleCreatePost} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Título del post"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Categoría</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Backend</option>
                      <option>Frontend</option>
                      <option>DevOps</option>
                      <option>Seguridad</option>
                      <option>Bases de Datos</option>
                      <option>Otros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (separados por comas)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="API, JavaScript, Seguridad"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Extracto</label>
                  <input
                    type="text"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Breve descripción del post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contenido (Markdown)</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    required
                    rows="15"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="Escribe aquí tu contenido en Markdown..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? 'Creando...' : 'Crear Post'}
                </button>
              </form>
            </div>

            {/* Lista de posts */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold mb-6">Mis Posts</h2>
              {posts.length === 0 ? (
                <p className="text-gray-600">No hay posts aún</p>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{post.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              post.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.published ? 'Publicado' : 'Borrador'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
