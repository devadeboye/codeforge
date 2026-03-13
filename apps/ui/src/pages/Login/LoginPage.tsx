import { Link } from 'react-router-dom';
import { Zap, Github } from 'lucide-react';

export function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-bg-primary">
      <div className="glass-panel flex flex-col items-center gap-6 p-12 rounded-2xl w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 font-code text-[28px] font-bold text-accent-purple tracking-wide">
          <Zap size={32} fill="currentColor" />
          <span>CodeForge</span>
        </div>
        <p className="text-[14px] text-fg-muted text-center">
          Collaborative code editing with a cyberpunk edge
        </p>

        {/* Form */}
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="px-3.5 py-2.5 bg-bg-primary border border-border-subtle rounded-lg text-fg-primary text-[14px] placeholder:text-fg-muted transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-accent-purple focus:ring-[3px] focus:ring-accent-purple/15"
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
          <input
            className="px-3.5 py-2.5 bg-bg-primary border border-border-subtle rounded-lg text-fg-primary text-[14px] placeholder:text-fg-muted transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-accent-purple focus:ring-[3px] focus:ring-accent-purple/15"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          <button
            className="py-2.5 px-5 bg-accent-purple text-bg-primary font-semibold text-[14px] rounded-lg border-none cursor-pointer transition-[opacity,box-shadow] duration-150 hover:opacity-90 hover:shadow-glow-purple"
            type="submit"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full text-[12px] text-fg-muted">
          <div className="flex-1 h-px bg-border-subtle" />
          or
          <div className="flex-1 h-px bg-border-subtle" />
        </div>

        {/* OAuth */}
        <button
          className="flex items-center justify-center gap-2 w-full py-2.5 px-5 bg-bg-tertiary text-fg-primary text-[14px] border border-border-subtle rounded-lg cursor-pointer transition-[background-color,border-color] duration-150 hover:bg-bg-elevated hover:border-border-active"
          type="button"
        >
          <Github size={18} />
          <span>Continue with GitHub</span>
        </button>

        <Link
          to="/dashboard"
          className="text-[13px] text-accent-cyan no-underline hover:underline hover:opacity-80"
        >
          Skip to Dashboard (dev)
        </Link>
      </div>
    </div>
  );
}
