import { create } from 'zustand'

interface SandboxState {
  code: string
  language: string
  output: string
  name: string
  isExecuting: boolean
  setCode: (code: string) => void
  setLanguage: (language: string) => void
  setOutput: (output: string) => void
  setName: (name: string) => void
  setIsExecuting: (isExecuting: boolean) => void
  reset: () => void
}

export const useSandboxStore = create<SandboxState>((set) => ({
  code: '',
  language: 'javascript',
  output: '',
  name: '',
  isExecuting: false,
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setOutput: (output) => set({ output }),
  setName: (name) => set({ name }),
  setIsExecuting: (isExecuting) => set({ isExecuting }),
  reset: () => set({ 
    code: '', 
    output: '', 
    name: '', 
    isExecuting: false 
  }),
}))
