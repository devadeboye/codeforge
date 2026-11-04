import { Terminal } from '@xterm/xterm';

// --- Mock command handler ---
export function handleCommand(term: Terminal, cmd: string) {
  switch (cmd) {
    case '':
      break;
    case 'help':
      term.writeln('\x1b[1;36mAvailable commands:\x1b[0m');
      term.writeln('  run      Run current project');
      term.writeln('  build    Compile & run container tests');
      term.writeln('  ls       List mock project files');
      term.writeln('  clear    Clear the terminal');
      term.writeln('  whoami   Show current user');
      term.writeln('  pwd      Print working directory');
      break;
    case 'build':
    case 'run':
    case 'test':
      term.writeln('\x1b[1;36m[BUILD]\x1b[0m  14:32:01 Compiling shader modules... \x1b[1;32mOK.\x1b[0m');
      term.writeln('\x1b[1;36m[BUILD]\x1b[0m  14:32:01 Compiling shader modules... \x1b[1;32mOK.\x1b[0m');
      term.writeln('\x1b[1;35m[SERVER]\x1b[0m 14:32:05 hot-reload-client connected at [::1]:65432');
      term.writeln('\x1b[1;33m[DOCKER]\x1b[0m 14:32:10 Running unit tests... \x1b[1;32mPASS (150/150).\x1b[0m');
      term.writeln('\x1b[1;32mBUILD SUCCESSFUL:\x1b[0m');
      break;
    case 'ls':
      term.writeln(
        '\x1b[1;34msrc/\x1b[0m  \x1b[1;34mcontrollers/\x1b[0m  api_handler.py  settings.json  index.html  package.json',
      );
      break;
    case 'clear':
      term.clear();
      break;
    case 'whoami':
      term.writeln('neo@codeforge');
      break;
    case 'pwd':
      term.writeln('~/codeforge/src/controllers');
      break;
    default:
      term.writeln(`\x1b[1;31mcommand not found:\x1b[0m ${cmd}`);
      term.writeln("Type \x1b[1;36m'help'\x1b[0m to see available commands.");
  }
}
