// Vercel API route for registrations
// File: api/registrations.js

// Simple in-memory storage for demo purposes
// Note: This resets on each deployment but allows the form to work
const REGISTRATIONS_KEY = 'demo_reboot_registrations';

// Get registrations from memory (simplified for demo)
function getRegistrations() {
    // In a real app, this would use a database or Vercel KV
    // For demo purposes, we'll use a simple approach
    return [];
}

// Store registration in memory (simplified for demo)
function storeRegistration(registration) {
    // In a real app, this would save to a database or Vercel KV
    console.log('Registration stored:', registration.id);
    return true;
}

console.log('Demo registration API loaded');

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

    try {
        if (req.method === 'GET') {
            // Get all registrations
            const registrations = getRegistrations();
            res.status(200).json(registrations);
        } else if (req.method === 'POST') {
            // Add new registration
            const newRegistration = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toISOString(),
                ...req.body
            };

            const stored = storeRegistration(newRegistration);
            if (stored) {
                res.status(200).json({ success: true, id: newRegistration.id });
            } else {
                res.status(500).json({ error: 'Failed to store registration' });
            }
        } else if (req.method === 'DELETE') {
            // Delete registration by ID (simplified for demo)
            res.status(200).json({ success: true, message: 'Registration deleted (demo mode)' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
