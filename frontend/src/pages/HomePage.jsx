import { useEffect, useState } from 'react';
import { bioAPI } from '../utils/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export function HomePage() {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const response = await bioAPI.getBio();
        setBio(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBio();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;
  if (!bio) return <div className="text-center">No hay información disponible</div>;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {bio.firstName} {bio.lastName}
              </h1>
              <p className="text-xl text-blue-100 mb-6">{bio.about}</p>
              <div className="flex flex-wrap gap-3">
                {bio.skills && bio.skills.slice(0, 5).map((skill) => (
                  <span key={skill.name} className="bg-blue-500 px-4 py-2 rounded-full text-sm">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            {bio.profileImage && (
              <div className="flex-1">
                <img
                  src={bio.profileImage}
                  alt={`${bio.firstName} ${bio.lastName}`}
                  className="w-64 h-64 rounded-full object-cover shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow">
              <FiMail className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <a href={`mailto:${bio.email}`} className="font-semibold hover:text-blue-600">
                  {bio.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow">
              <FiPhone className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <a href={`tel:${bio.phone}`} className="font-semibold hover:text-blue-600">
                  {bio.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow">
              <FiMapPin className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Ubicación</p>
                <p className="font-semibold">{bio.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow">
              <FiGithub className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">GitHub</p>
                <a href={bio.socialLinks?.github} target="_blank" rel="noopener noreferrer"
                   className="font-semibold hover:text-blue-600">
                  Visitame
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Habilidades Profesionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bio.skills && bio.skills.map((skill) => (
              <div key={skill.name} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      skill.level === 'Avanzado'
                        ? 'bg-green-500 w-5/6'
                        : skill.level === 'Intermedio'
                        ? 'bg-yellow-500 w-4/6'
                        : 'bg-blue-500 w-1/2'
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Experiencia Laboral</h2>
          <div className="space-y-6">
            {bio.experience && bio.experience.map((exp, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {exp.isCurrentRole ? 'Actual' : 'Anterior'}
                  </span>
                </div>
                <p className="text-gray-700 mt-3">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Educación</h2>
          <div className="space-y-6">
            {bio.education && bio.education.map((edu, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.field}</p>
                  </div>
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded">
                    {edu.isCurrentStudy ? 'En progreso' : 'Completado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
