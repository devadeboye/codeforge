import { useEffect, useRef } from 'react';
import { X, Plus, ChevronDown, Split, Minus, Sparkles } from 'lucide-react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useUIStore } from '../../../store/useUIStore';
import { handleCommand } from './util';
import '@xterm/xterm/css/xterm.css';

export function TerminalPanel() {
  const { toggleTerminal } = useUIStore();

  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"Fira Code", "Cascadia Code", monospace',
      fontSize: 13,
      lineHeight: 1.5,
      cursorStyle: 'block',
      theme: {
        background: '#191a21', // Darker cyber backdrop
        foreground: '#f8f8f2',
        cursor: '#50fa7b', // Neon green block cursor
        selectionBackground: 'rgba(189, 147, 249, 0.3)',
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

    term.open(terminalRef.current);
    xtermRef.current = term;
    fitAddonRef.current = fitAddon;

    const rafId = requestAnimationFrame(() => {
      fitAddon.fit();
      // Render build output matching the mockup screenshot
      term.writeln('\x1b[1;36m[BUILD]\x1b[0m  \x1b[2m14:32:01\x1b[0m Compiling shader modules... \x1b[1;32mOK.\x1b[0m');
      term.writeln('\x1b[1;36m[BUILD]\x1b[0m  \x1b[2m14:32:01\x1b[0m Compiling shader modules... \x1b[1;32mOK.\x1b[0m');
      term.writeln('\x1b[1;35m[SERVER]\x1b[0m \x1b[2m14:32:05\x1b[0m hot-reload-client connected at [::1]:65432');
      term.writeln('\x1b[1;33m[DOCKER]\x1b[0m \x1b[2m14:32:10\x1b[0m Running unit tests... \x1b[1;32mPASS (150/150).\x1b[0m');
      term.write('\x1b[1;32mBUILD SUCCESSFUL:\x1b[0m ');
    });

    let inputBuffer = '';
    term.onKey(({ key, domEvent }) => {
      const printable =
        !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

      if (domEvent.key === 'Enter') {
        term.writeln('');
        handleCommand(term, inputBuffer.trim());
        inputBuffer = '';
        term.write('\x1b[1;32mBUILD SUCCESSFUL:\x1b[0m ');
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
    <div className="relative flex flex-col h-full bg-[#191a21] border-t border-border-subtle overflow-hidden select-none">
      {/* Terminal Title & Controls Bar */}
      <div className="flex items-center justify-between h-8 px-3 bg-bg-secondary border-b border-border-subtle shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-semibold text-fg-primary tracking-wide">
            Terminal
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-fg-muted">
          <button
            className="flex items-center justify-center w-6 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="New Terminal"
            type="button"
          >
            <Plus size={13} />
          </button>
          <button
            className="flex items-center justify-center w-5 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Select Terminal Shell"
            type="button"
          >
            <ChevronDown size={12} />
          </button>
          <button
            className="flex items-center justify-center w-6 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Split Terminal"
            type="button"
          >
            <Split size={12} />
          </button>
          <button
            className="flex items-center justify-center w-6 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Minimize Panel"
            onClick={toggleTerminal}
            type="button"
          >
            <Minus size={13} />
          </button>
          <button
            className="flex items-center justify-center w-6 h-6 rounded text-fg-muted hover:text-fg-primary hover:bg-bg-tertiary transition-colors border-none bg-transparent cursor-pointer"
            title="Close Terminal"
            onClick={toggleTerminal}
            type="button"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Terminal Canvas */}
      <div ref={terminalRef} className="flex-1 overflow-hidden p-2 relative" />

      {/* Ambient bottom-right sparkle icon from mockup */}
      <div className="absolute bottom-2.5 right-3 text-fg-muted/30 pointer-events-none">
        <Sparkles size={16} />
      </div>
    </div>
  );
}
