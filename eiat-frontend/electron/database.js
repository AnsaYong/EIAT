// Manages SQLite interactions within Electron process
import Database from 'better-sqlite3'; 
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'projects.db');

// Initialize the database connection
let db;
try {
    db = new Database(dbPath);
    console.log('SQLite database connection established');
} catch (err) {
    console.error('Could not connect to the database:', err);
}

// Create projects table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT,
            data TEXT
        )
    `).run();
    console.log('Table "projects" created or verified.');
} catch (err) {
    console.log('Error creating or verifying table:', err);
}

// Save project
function saveProject(project) {
    const { id, name, data } = project;
    if (!id || !name) {
        console.error('Error: Missing required project fields');
        return;
    }
    try {
        db.prepare('INSERT OR REPLACE INTO projects (id, name, data) VALUES (?, ?, ?)').run(id, name, JSON.stringify(data || {}));
        console.log('Project saved:', name);
    } catch (err) {
        console.error('Error saving project to SQLite:', err);
    }
}

// Fetch all projects
function getProjects(callback) {
    try {
        const rows = db.prepare(`SELECT * FROM projects`).all();
        const projects = rows.map(row => ({
            id: row.id,
            name: row.name,
            data: JSON.parse(row.data),
        }));
        callback(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        callback([]);
    }
}

// Sync queue table
try {
    db.prepare(`
        CREATE TABLE IF NOT EXISTS sync_queue (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            operation TEXT NOT NULL,
            project_id TEXT,
            project_data TEXT,
            synced INTEGER DEFAULT 0
        )
    `).run();
    console.log('Sync queue table created or verified.');
} catch (err) {
    console.log('Error creating or verifying sync queue table:', err);
}

// Offline project queueing functions
function saveProjectOffline(project) {
    const { id, name, data } = project;
    try {
        db.prepare('INSERT INTO sync_queue (operation, project_id, project_data) VALUES (?, ?, ?)')
            .run('create', id, JSON.stringify(project));
        console.log('Project queued for creation:', name);
    } catch (err) {
        console.error('Error queuing project for creation:', err);
    }
}

function updateProjectOffline(project) {
    const { id, name, data } = project;
    try {
        db.prepare('INSERT INTO sync_queue (operation, project_id, project_data) VALUES (?, ?, ?)')
            .run('update', id, JSON.stringify(project));
        console.log('Project queued for update:', name);
    } catch (err) {
        console.error('Error queuing project for update:', err);
    }
}

function deleteProjectOffline(projectId) {
    try {
        db.prepare('INSERT INTO sync_queue (operation, project_id) VALUES (?, ?)')
            .run('delete', projectId);
        console.log('Project queued for deletion:', projectId);
    } catch (err) {
        console.error('Error queuing project for deletion:', err);
    }
}

// Clear synced queue entries
function clearSyncedQueue() {
    try {
        db.prepare('DELETE FROM sync_queue WHERE synced = 1').run();
        console.log('Cleared synced projects from queue.');
    } catch (err) {
        console.error('Error clearing synced projects:', err);
    }
}

// Export the functions
export { db, saveProject, getProjects, saveProjectOffline, updateProjectOffline, deleteProjectOffline, clearSyncedQueue };
