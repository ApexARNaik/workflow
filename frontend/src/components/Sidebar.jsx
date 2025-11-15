// frontend/src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../lib/ui/Card';

// Navigation list
const nav = [
  { label: 'Projects', to: '/projects' },
  { label: 'Teams', to: '/teams' },
  { label: 'Analytics', to: '/analytics' },
  { label: 'Chatbot', to: '/chatbot' },
];

export default function Sidebar({ onLogout }) {
  return (
    <aside className="w-72 h-screen p-6 bg-slate-900/50 flex flex-col justify-between border-r border-slate-700/50">
      <div>
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div>
              <div className="mb-h1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Workflow
              </div>
            </div>
          </div>
        </div>

        <Card soft className="overflow-hidden bg-slate-800/30 border border-slate-700/50">
          <nav className="flex flex-col space-y-2">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                className="block px-3 py-2 rounded-xl text-slate-300 hover:text-blue-400 hover:bg-slate-700/50 hover:translate-x-1 transition-all transform duration-200"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </Card>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={onLogout}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-xl text-center font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-red-500/50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}