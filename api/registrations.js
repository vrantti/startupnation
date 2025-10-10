// Vercel API route for registrations
// File: api/registrations.js

const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json');

// Ensure data directory exists
async function ensureDataFile() {
    try {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
}

// Load registrations
async function loadRegistrations() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading registrations:', error);
        return [];
    }
}

// Save registrations
async function saveRegistrations(registrations) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving registrations:', error);
        return false;
    }
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    await ensureDataFile();

    try {
        if (req.method === 'GET') {
            // Get all registrations
            const registrations = await loadRegistrations();
            res.status(200).json(registrations);
        } else if (req.method === 'POST') {
            // Add new registration
            const registrations = await loadRegistrations();
            
            const newRegistration = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toISOString(),
                ...req.body
            };
            
            registrations.push(newRegistration);
            
            const saved = await saveRegistrations(registrations);
            if (saved) {
                res.status(200).json({ success: true, id: newRegistration.id });
            } else {
                res.status(500).json({ error: 'Failed to save registration' });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
