export interface Sandbox {
  id?: string;
  name: string;
  code: string;
  language: string;
  output: string;
}

export interface SandboxState {
  currentSandbox: Sandbox;
  savedSandboxes: Sandbox[];
  isExecuting: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface RootState {
  sandbox: SandboxState;
}
