import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Sandbox, SandboxState } from '@/types/sandbox';

const initialState: SandboxState = {
  currentSandbox: {
    name: '',
    code: '',
    language: 'javascript',
    output: '',
  },
  savedSandboxes: [],
  isExecuting: false,
  error: null,
  status: 'idle',
};

// Async thunks
export const saveSandbox = createAsyncThunk(
  'sandbox/save',
  async (sandbox: Sandbox) => {
    const response = await fetch('/api/sandbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sandbox),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save sandbox');
    }
    
    return response.json();
  }
);

export const loadSandboxes = createAsyncThunk(
  'sandbox/load',
  async (language?: string) => {
    const url = language ? `/api/sandbox?language=${language}` : '/api/sandbox';
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to load sandboxes');
    }
    
    return response.json();
  }
);

export const executeCode = createAsyncThunk(
  'sandbox/execute',
  async (sandbox: { code: string; language: string }) => {
    const response = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sandbox),
    });
    
    if (!response.ok) {
      throw new Error('Failed to execute code');
    }
    
    return response.json();
  }
);

const sandboxSlice = createSlice({
  name: 'sandbox',
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.currentSandbox.code = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentSandbox.language = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.currentSandbox.name = action.payload;
    },
    resetSandbox: (state) => {
      state.currentSandbox = initialState.currentSandbox;
      state.error = null;
    },
    clearOutput: (state) => {
      state.currentSandbox.output = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Save sandbox
      .addCase(saveSandbox.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveSandbox.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedSandboxes.unshift(action.payload);
      })
      .addCase(saveSandbox.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to save sandbox';
      })
      
      // Load sandboxes
      .addCase(loadSandboxes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSandboxes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.savedSandboxes = action.payload;
      })
      .addCase(loadSandboxes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load sandboxes';
      })
      
      // Execute code
      .addCase(executeCode.pending, (state) => {
        state.isExecuting = true;
        state.error = null;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.isExecuting = false;
        state.currentSandbox.output = action.payload.output;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.isExecuting = false;
        state.error = action.error.message || 'Failed to execute code';
      });
  },
});

export const {
  setCode,
  setLanguage,
  setName,
  resetSandbox,
  clearOutput,
} = sandboxSlice.actions;

export default sandboxSlice.reducer;
