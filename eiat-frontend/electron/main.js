// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'url';

// Project database
// Import the Project Service
import * as ProjectService from '../src/api/ProjectService.js';
import { db, saveProject } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.mjs'),
            nodeIntegration: false,  // Enable for Electron API access in frontend
            contextIsolation: true,  // Required to use `contextBridge` in preload.js
            nodeIntegrationInWorker: true,
        }
    });

    // Load the Vite app URL
    mainWindow.loadURL('http://localhost:5173'); // Vite default port

    // Open the DevTools (optional).
    mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

// Listen for save project request from React frontend
ipcMain.on('save-project', (event, project) => {
    try {
        saveProject(project);
        event.reply('project-saved', { success: true });
    } catch (error) {
        console.error('Error saving project:', error);
        event.reply('project-saved', { success: false, error: error.message });
    }
});

// Fetch projects request
ipcMain.on('fetch-projects', async (event) => {
    try {
        const projects = await ProjectService.getProjects();
        event.reply('fetched-projects', projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        event.reply('fetched-projects', { success: false, error: error.message });
    }
});

// Sync projects when online
ipcMain.on('sync-queue', async () => {
    try {
        const unsyncedProjects = db.prepare(`
            SELECT * FROM sync_queue WHERE synced = 0
        `).all();

        if (unsyncedProjects.length === 0) {
            console.log('No unsynced projects in queue.');
            return;
        }

        for (const project of unsyncedProjects) {
            const { operation, project_id, project_data } = project;
            const parsedData = JSON.parse(project_data);

            try {
                if (operation === 'create') {
                    await ProjectService.createProject(parsedData);
                    console.log(`Project ${project_id} synced to server (create).`);
                } else if (operation === 'update') {
                    await ProjectService.updateProject(project_id, parsedData);
                    console.log(`Project ${project_id} synced to server (update).`);
                } else if (operation === 'delete') {
                    await ProjectService.deleteProject(project_id);
                    console.log(`Project ${project_id} synced to server (delete).`);
                }

                db.prepare(`UPDATE sync_queue SET synced = 1 WHERE id = ?`).run(project.id);
            } catch (error) {
                console.error(`Error syncing project ${project_id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error syncing queue:', error);
    }
});
