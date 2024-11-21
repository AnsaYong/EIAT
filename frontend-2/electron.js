import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// TODO: init window

async function createWindow() {
    // Create browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'The EIAT',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    await mainWindow.loadURL('http://localhost:5173'); // Vite default port
}

app.whenReady().then(createWindow);
