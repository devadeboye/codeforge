import { useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { getLanguageExtension } from './languages';
import { createRemoteCursorsExtension } from './remoteCursors';
import { usePresenceStore } from '../../../store/usePresenceStore';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  fileId?: string;
}

export function CodeEditor({
  value,
  onChange,
  language = 'javascript',
  fileId = '',
}: CodeEditorProps) {
  const { collaborators } = usePresenceStore();

  const extensions = useMemo(() => {
    return [
      getLanguageExtension(language),
      createRemoteCursorsExtension(collaborators, fileId),
    ];
  }, [language, collaborators, fileId]);

  return (
    <div className="w-full h-full overflow-hidden bg-bg-primary relative">
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
