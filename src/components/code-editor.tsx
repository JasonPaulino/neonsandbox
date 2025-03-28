'use client';

import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCode } from '@/store/features/sandbox/sandboxSlice';

const languageMap = {
  javascript: 'javascript',
  python: 'python',
  go: 'go',
};

export function CodeEditor() {
  const dispatch = useAppDispatch();
  const { code, language } = useAppSelector((state) => state.sandbox.currentSandbox);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative h-full w-full min-h-[500px] border border-border/50 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={languageMap[language as keyof typeof languageMap]}
        defaultValue={code}
        theme="vs-dark"
        onChange={(value) => dispatch(setCode(value || ''))}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          lineNumbers: 'on',
          fontFamily: 'var(--font-geist-mono)',
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16 },
        }}
        className="[&_*]:font-mono"
      />
    </div>
  );
}
