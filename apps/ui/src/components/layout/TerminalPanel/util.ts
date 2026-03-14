import { Terminal } from '@xterm/xterm';

// --- Mock command handler ---
export function handleCommand(term: Terminal, cmd: string) {
  switch (cmd) {
    case '':
      break;
    case 'help':
      term.writeln('\x1b[1;36mAvailable commands:\x1b[0m');
      term.writeln('  help     Show this message');
      term.writeln('  ls       List mock project files');
      term.writeln('  clear    Clear the terminal');
      term.writeln('  whoami   Show current user');
      term.writeln('  pwd      Print working directory');
      break;
    case 'ls':
      term.writeln(
        '\x1b[1;34msrc/\x1b[0m  \x1b[1;34mnode_modules/\x1b[0m  package.json  README.md  tsconfig.json',
      );
      break;
    case 'clear':
      term.clear();
      break;
    case 'whoami':
      term.writeln('hacker@codeforge');
      break;
    case 'pwd':
      term.writeln('/home/hacker/codeforge');
      break;
    default:
      term.writeln(`\x1b[1;31mcommand not found:\x1b[0m ${cmd}`);
      term.writeln("Type \x1b[1;36m'help'\x1b[0m to see available commands.");
  }
}
