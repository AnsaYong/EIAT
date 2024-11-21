// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import process from 'node:process';
import path from 'node:path';
import { ipcRenderer, contextBridge } from 'electron';


window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

// Expose Electron and Node.js functionality to the renderer process
contextBridge.exposeInMainWorld('electron', {
    /**
     * Sends a request to save a project
     * @param {object} project - The project data to be saved
     */
    saveProject: (project) => ipcRenderer.send('save-project', project),

    /**
     * Sends a request to fetch all projects
     */
    fetchProjects: () => ipcRenderer.send('fetch-projects'),

    /**
     * Listens for the 'fetched-projects' event and invokes the provided callback
     * @param {function} callback - Function to call when 'fetched-projects' is received
     */
    onFetchedProjects: (callback) => ipcRenderer.on('fetched-projects', callback),

    /**
     * Joins path segments safely using Node's path.join
     * @param  {...string} args - Path segments to join
     * @returns {string} - The joined path
     */
    joinPath: (...args) => path.join(...args),
});