import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useUIStore } from '../../../store/useUIStore';
import { handleCommand } from './util';
import '@xterm/xterm/css/xterm.css';

export function TerminalPanel() {
  const { toggleTerminal } = useUIStore();

  // Ref to the container div where xterm will mount itself
  const terminalRef = useRef<HTMLDivElement>(null);
  // Keep Terminal instance around between renders (don't recreate it)
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    // Guard: only init once, and only when the container is in the DOM
    if (!terminalRef.current || xtermRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: 13,
      lineHeight: 1.5,
      theme: {
        background: '#1e1e2e', // Dracula bg
        foreground: '#f8f8f2', // Dracula fg
        cursor: '#bd93f9', // Dracula purple
        selectionBackground: '#44475a',
        black: '#21222c',
        red: '#ff5555',
        green: '#50fa7b',
        yellow: '#f1fa8c',
        blue: '#bd93f9',
        magenta: '#ff79c6',
        cyan: '#8be9fd',
        white: '#f8f8f2',
        brightBlack: '#6272a4',
        brightGreen: '#50fa7b',
        brightYellow: '#ffffa5',
        brightBlue: '#d6acff',
        brightMagenta: '#ff92df',
        brightCyan: '#a4ffff',
        brightWhite: '#ffffff',
      },
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // Mount xterm into the container div
    term.open(terminalRef.current);

    // Store refs so we can clean up / resize later
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    // Defer fit until after the browser has painted the terminal canvas so the container has its final flex dimensions.
    const rafId = requestAnimationFrame(() => {
      fitAddon.fit();
      term.writeln('\x1b[1;35m  +-------------------------------+');
      term.writeln('  |   CodeForge Terminal v0.1    |');
      term.writeln('  +-------------------------------+\x1b[0m');
      term.writeln(
        '  \x1b[2mType \x1b[0;36mhelp\x1b[0m\x1b[2m to see available commands.\x1b[0m',
      );
      term.writeln('');
      term.write('\x1b[1;32m~/codeforge\x1b[0m $ ');
    });

    // --- Mock shell: echo back typed characters and handle Enter ---
    let inputBuffer = '';
    term.onKey(({ key, domEvent }) => {
      const printable =
        !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.key === 'Enter') {
        term.writeln('');
        handleCommand(term, inputBuffer.trim());
        inputBuffer = '';
        term.write('\x1b[1;32m~/codeforge\x1b[0m $ ');
      } else if (domEvent.key === 'Backspace') {
        if (inputBuffer.length > 0) {
          inputBuffer = inputBuffer.slice(0, -1);
          term.write('\b \b');
        }
      } else if (printable) {
        inputBuffer += key;
        term.write(key);
      }
    });

    // Resize observer so the terminal resizes with the panel
    const resizeObserver = new ResizeObserver(() => {
      fitAddonRef.current?.fit();
    });
    resizeObserver.observe(terminalRef.current);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      term.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-bg-secondary overflow-hidden">
      {/* Header with tabs */}
      <div className="flex items-center justify-between h-8 px-3 border-t border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-0.5">
          {['Terminal', 'Output', 'Problems'].map((tab, i) => (
            <button
              key={tab}
              className={[
                'flex items-center gap-1 px-2.5 py-1 text-[12px] border-none bg-transparent rounded cursor-pointer transition-colors duration-150',
                i === 0
                  ? 'text-fg-primary border-b border-accent-purple'
                  : 'text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary',
              ].join(' ')}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          className="flex items-center justify-center w-6 h-6 text-fg-muted border-none bg-transparent rounded cursor-pointer transition-colors duration-150 hover:text-fg-primary hover:bg-bg-tertiary"
          title="Close Terminal"
          onClick={toggleTerminal}
          type="button"
        >
          <X size={14} />
        </button>
      </div>

      {/* Xterm.js mounts into this div — must have a real pixel height */}
      <div ref={terminalRef} className="flex-1 overflow-hidden p-1" />
    </div>
  );
}
