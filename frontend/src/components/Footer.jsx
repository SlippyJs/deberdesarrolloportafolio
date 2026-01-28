export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Juan Carlos Banda</h3>
            <p className="text-gray-400">Desarrollador de Software | Estudiante</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Enlaces útiles</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Inicio</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Redes Sociales</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
              <li><a href="mailto:juanitoalcachofaa_100@outlook.com" className="hover:text-white">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Juan Carlos Banda Guamán. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
