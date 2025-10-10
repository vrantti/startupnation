// Vercel API route for statistics
// File: api/stats.js

export default async function handler(req, res) {
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
        // For demo purposes, return basic stats
        // In a real app, this would connect to a database
        const stats = {
            total: 0,
            guests: 0,
            sponsors: 0,
            hackers: 0,
            sponsorshipInterested: 0,
            hackInterested: 0,
            message: "Demo mode - stats will show when connected to database"
        };
        
        res.status(200).json(stats);
    } catch (error) {
        console.error('Stats API Error:', error);
        res.status(500).json({ error: 'Failed to load stats' });
    }
}
