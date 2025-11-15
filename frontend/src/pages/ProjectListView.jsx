// frontend/src/pages/ProjectListView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const ProjectListView = () => {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await apiClient.get('/projects');
      setProjects(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchTeams = async () => {
    try {
      const res = await apiClient.get('/teams');
      setTeams(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found. Skipping data fetching.');
      return;
    }
    fetchProjects();
    fetchTeams();
  }, []);

  const handleAssignTeamClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleTeamChange = (e) => {
    setSelectedTeamId(e.target.value);
  };

  const handleAssignTeamSubmit = async () => {
    if (!selectedTeamId) {
      alert('Please select a team.');
      return;
    }

    try {
      await apiClient.put(`/projects/${selectedProject.id}`, {
        teamId: selectedTeamId,
      });
      await fetchProjects();
      setIsModalOpen(false);
      setSelectedProject(null);
      setSelectedTeamId('');
    } catch (err) {
      console.error('Failed to assign team:', err);
      alert('Error assigning team. Please try again.');
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await apiClient.delete(`/projects/${projectId}`);
      await fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Error deleting project. Please try again.');
    }
  };

  if (error) {
    return <div className="p-10 text-red-400 font-bold bg-red-900/20 rounded-lg">❌ Error: {error}</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">📂 Project Management</h1>
        <button
          onClick={() => navigate('/projects/new')}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-blue-500/50 font-semibold"
        >
          + New Project
        </button>
      </div>

      <div className="grid gap-6">
        {projects.length === 0 && <p className="text-slate-400">Loading projects or no data found...</p>}

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-800 p-6 rounded-xl shadow-xl border border-blue-500/20 hover:border-blue-500/40 transition-all"
          >
            <h2 className="text-2xl font-bold text-blue-400 mb-2">{project.title}</h2>
            <p className="text-slate-300 mb-2">{project.goal}</p>
            <p className="text-sm text-slate-400 mb-2">
              Deadline: {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              Assigned Team: <span className="text-blue-400">{project.team ? project.team.name : 'None'}</span>
            </p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
              >
                Decompose Project
              </button>
              <button
                onClick={() => handleAssignTeamClick(project)}
                className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-2 rounded-xl hover:from-yellow-700 hover:to-yellow-800 transition-all shadow-lg"
              >
                Assign Team
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Assign Team Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl shadow-2xl border border-blue-500/30 w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-blue-400">Assign Team to Project</h2>
            <p className="text-slate-300 mb-4">
              Assigning team to: <strong className="text-blue-400">{selectedProject?.title}</strong>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Team</label>
              <select
                value={selectedTeamId}
                onChange={handleTeamChange}
                className="w-full bg-slate-900/50 border border-blue-500/30 text-slate-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
              >
                <option value="">-- Select a Team --</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAssignTeamSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                Assign Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectListView;