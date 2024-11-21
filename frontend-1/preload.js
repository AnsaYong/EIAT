// Handles security aspects and expose safe APIs

import { contextBridge, ipcRenderer } from 'electron';

console.log('Preload script loaded');

// Expose three functions (minimize, maximize, and close) that can be called from the
// renderer process (React component). These functions send IPC messages to the main process (main.js).
contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window')
});
