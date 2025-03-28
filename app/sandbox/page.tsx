'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { executeCode } from '@/store/features/sandbox/sandboxSlice';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/code-editor';
import { OutputPanel } from '@/components/output-panel';
import { LanguageSelector } from '@/components/language-selector';
import { toast } from 'sonner';

export default function SandboxPage() {
  const dispatch = useAppDispatch();
  const { code, language, isExecuting } = useAppSelector((state) => ({
    code: state.sandbox.currentSandbox.code,
    language: state.sandbox.currentSandbox.language,
    isExecuting: state.sandbox.isExecuting,
  }));

  const handleExecute = useCallback(async () => {
    try {
      await dispatch(executeCode({ code, language })).unwrap();
    } catch (error: any) {
      toast.error(error.message || 'Failed to execute code');
    }
  }, [dispatch, code, language]);

  return (
    <main className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <LanguageSelector />
        <Button
          onClick={handleExecute}
          disabled={isExecuting || !code.trim()}
          className="gap-2"
        >
          {isExecuting ? (
            <>
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Running...
            </>
          ) : (
            'Run Code'
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-[600px]">
          <CodeEditor />
        </div>
        <div className="h-[600px]">
          <OutputPanel />
        </div>
      </div>
    </main>
  );
}
