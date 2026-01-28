import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postsAPI } from '../utils/api';
import ReactMarkdown from 'react-markdown';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FiArrowLeft, FiCalendar, FiUser, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function PostDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getPostBySlug(slug);
        setPost(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>;
  if (!post) return <div className="text-center py-12">Post no encontrado</div>;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
        >
          <FiArrowLeft /> Volver al blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <FiCalendar size={18} />
                <span>{new Date(post.publishedAt).toLocaleDateString('es-ES')}</span>
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <FiUser size={18} />
                  <span>{post.author.username}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <FiEye size={18} />
                <span>{post.viewCount} vistas</span>
              </div>
            </div>

            {post.category && (
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              className="markdown"
              components={{
                h1: ({ node, ...props }) => <h1 {...props} />,
                h2: ({ node, ...props }) => <h2 {...props} />,
                h3: ({ node, ...props }) => <h3 {...props} />,
                p: ({ node, ...props }) => <p {...props} />,
                ul: ({ node, ...props }) => <ul {...props} />,
                ol: ({ node, ...props }) => <ol {...props} />,
                li: ({ node, ...props }) => <li {...props} />,
                code: ({ node, inline, ...props }) =>
                  inline ? <code {...props} /> : <pre><code {...props} /></pre>,
                blockquote: ({ node, ...props }) => <blockquote {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
