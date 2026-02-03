import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Kita tembak ke /api/projects. Proxy akan mengarahkannya ke port 4000
        const response = await axios.get('/api/projects');
        setProjects(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal mengambil data dari Backend.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-emerald-400">
        Feature Branch: Frontend Setup 🚀
      </h1>

      {loading && <p className="text-center animate-pulse">Sedang memuat data...</p>}

      {error && <p className="text-center text-red-500 bg-red-900/20 p-4 rounded">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 transition duration-300">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack && project.tech_stack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-emerald-900 text-emerald-300 text-xs rounded-full font-medium border border-emerald-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;