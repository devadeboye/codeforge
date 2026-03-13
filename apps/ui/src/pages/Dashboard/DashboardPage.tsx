import { Link } from 'react-router-dom';
import { Zap, Plus } from 'lucide-react';

const MOCK_PROJECTS = [
  {
    id: 'demo-1',
    name: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of deep learning architectures',
    language: 'TypeScript',
    lastEdited: '2 hours ago',
  },
  {
    id: 'demo-2',
    name: 'Rust Raytracer',
    description: 'High-performance ray tracing engine with WASM output',
    language: 'Rust',
    lastEdited: '1 day ago',
  },
  {
    id: 'demo-3',
    name: 'Go Microservices',
    description: 'Template for gRPC-based microservices with Docker',
    language: 'Go',
    lastEdited: '3 days ago',
  },
];

export function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border-subtle bg-bg-secondary shrink-0">
        <div className="flex items-center gap-2 font-code text-[18px] font-semibold text-accent-purple">
          <Zap size={20} fill="currentColor" />
          <span>CodeForge</span>
        </div>
        <span className="text-[13px] text-fg-secondary">devadeboye</span>
      </header>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-fg-primary mb-2">
          Your Projects
        </h1>
        <p className="text-[14px] text-fg-muted mb-6">
          Select a project to open in the editor, or create a new one.
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
          {/* New project card */}
          <button
            className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-border-subtle bg-transparent min-h-[140px] text-[14px] text-fg-muted cursor-pointer transition-[border-color,color] duration-200 hover:border-accent-purple hover:text-accent-purple"
            type="button"
          >
            <Plus size={32} />
            <span>New Project</span>
          </button>

          {/* Project cards */}
          {MOCK_PROJECTS.map((project) => (
            <Link
              key={project.id}
              to={`/editor/${project.id}`}
              className="glass-panel flex flex-col gap-3 p-5 rounded-xl cursor-pointer no-underline text-inherit transition-[border-color,transform,box-shadow] duration-200 hover:border-border-active hover:-translate-y-0.5 hover:shadow-glow-purple"
            >
              <span className="text-[15px] font-semibold text-fg-primary">
                {project.name}
              </span>
              <span className="text-[13px] text-fg-muted leading-snug">
                {project.description}
              </span>
              <div className="flex items-center gap-3 text-[12px] text-fg-muted mt-auto">
                <span>{project.language}</span>
                <span>·</span>
                <span>{project.lastEdited}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
