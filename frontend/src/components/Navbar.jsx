import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiMenu, FiX, FiHome, FiFileText, FiLogOut, FiLogIn, FiUser } from 'react-icons/fi';
import { useState } from 'react';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'text-blue-600 font-bold' : '';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            JCB
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={`hover:text-blue-600 transition ${isActive('/')}`}>
              <span className="flex items-center gap-2">
                <FiHome /> Inicio
              </span>
            </Link>
            <Link to="/blog" className={`hover:text-blue-600 transition ${isActive('/blog')}`}>
              <span className="flex items-center gap-2">
                <FiFileText /> Blog
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className={`hover:text-blue-600 transition ${isActive('/admin')}`}
                >
                  <span className="flex items-center gap-2">
                    <FiUser /> Admin
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:text-red-600 transition"
                >
                  <FiLogOut /> Salir
                </button>
              </>
            ) : (
              <Link to="/login" className={`hover:text-blue-600 transition ${isActive('/login')}`}>
                <span className="flex items-center gap-2">
                  <FiLogIn /> Login
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Inicio
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-100"
            >
              Blog
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
