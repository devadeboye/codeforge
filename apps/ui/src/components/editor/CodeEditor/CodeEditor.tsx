import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: 'javascript' | 'typescript' | 'json' | 'markdown' | 'rust' | 'python' | 'go' | 'cpp' | 'html' | 'css';
}

export function CodeEditor({ value, onChange, language = 'javascript' }: CodeEditorProps) {
  // TODO Map language strings to CodeMirror language extensions
  // using javascript as a placeholder
  const extensions = [javascript({ jsx: true, typescript: language === 'typescript' })];

  return (
    <div className="w-full h-full overflow-hidden bg-bg-primary">
      <CodeMirror
        value={value}
        height="100%"
        theme={dracula}
        extensions={extensions}
        onChange={(val) => onChange(val)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="h-full font-code text-[14px]"
      />
    </div>
  );
}
