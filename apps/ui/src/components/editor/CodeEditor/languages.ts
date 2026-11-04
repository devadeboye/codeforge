import { Extension } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';
import { cpp } from '@codemirror/lang-cpp';
import { markdown } from '@codemirror/lang-markdown';

export type SupportedLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'json'
  | 'html'
  | 'css'
  | 'rust'
  | 'go'
  | 'cpp'
  | 'markdown';

export function getLanguageExtension(language?: string): Extension {
  const lang = language?.toLowerCase();

  switch (lang) {
    case 'python':
    case 'py':
      return python();
    case 'typescript':
    case 'ts':
    case 'tsx':
      return javascript({ jsx: true, typescript: true });
    case 'javascript':
    case 'js':
    case 'jsx':
      return javascript({ jsx: true, typescript: false });
    case 'json':
      return json();
    case 'html':
      return html();
    case 'css':
      return css();
    case 'rust':
    case 'rs':
      return rust();
    case 'go':
      return go();
    case 'cpp':
    case 'c':
    case 'cxx':
      return cpp();
    case 'markdown':
    case 'md':
      return markdown();
    default:
      return javascript({ jsx: true });
  }
}

