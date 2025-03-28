'use client';

import { useAppSelector } from '@/store/hooks';
import { ScrollArea } from '@/components/ui/scroll-area';

export function OutputPanel() {
  const { output, isExecuting } = useAppSelector((state) => ({
    output: state.sandbox.currentSandbox.output,
    isExecuting: state.sandbox.isExecuting,
  }));

  return (
    <div className="h-full w-full min-h-[200px] border border-border/50 rounded-lg overflow-hidden bg-background/95">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <h3 className="text-sm font-medium">Output</h3>
        {isExecuting && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Running...</span>
          </div>
        )}
      </div>
      <ScrollArea className="h-[calc(100%-40px)] p-4">
        <pre className="text-sm font-mono whitespace-pre-wrap break-words">
          {output || 'No output yet...'}
        </pre>
      </ScrollArea>
    </div>
  );
}
