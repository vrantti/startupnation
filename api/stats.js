// Vercel API route for statistics
// File: api/stats.js

const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json');

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

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const registrations = await loadRegistrations();
        
        const stats = {
            total: registrations.length,
            guests: registrations.filter(r => r.participant_type === 'guest').length,
            sponsors: registrations.filter(r => r.participant_type === 'sponsor').length,
            hackers: registrations.filter(r => r.participant_type === 'hacker').length,
            sponsorshipInterested: registrations.filter(r => r.sponsorship_interest && r.sponsorship_interest.toLowerCase().includes('yes')).length,
            hackInterested: registrations.filter(r => r.hack_interest && r.hack_interest.toLowerCase().includes('yes')).length
        };
        
        res.status(200).json(stats);
    } catch (error) {
        console.error('Stats API Error:', error);
        res.status(500).json({ error: 'Failed to load stats' });
    }
}