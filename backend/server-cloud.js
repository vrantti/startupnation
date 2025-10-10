const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'registrations.json');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (for admin dashboard)
app.use(express.static(path.join(__dirname, '..')));

// Ensure data file exists
async function ensureDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
}

// Load registrations from file
async function loadRegistrations() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading registrations:', error);
        return [];
    }
}

// Save registrations to file
async function saveRegistrations(registrations) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(registrations, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving registrations:', error);
        return false;
    }
}

// Routes
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await loadRegistrations();
        res.json(registrations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load registrations' });
    }
});

app.post('/api/registrations', async (req, res) => {
    try {
        const registrations = await loadRegistrations();
        
        // Add new registration
        const newRegistration = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            ...req.body
        };
        
        registrations.push(newRegistration);
        
        const saved = await saveRegistrations(registrations);
        if (saved) {
            res.json({ success: true, id: newRegistration.id });
        } else {
            res.status(500).json({ error: 'Failed to save registration' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to process registration' });
    }
});

app.get('/api/stats', async (req, res) => {
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
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load stats' });
    }
});

app.delete('/api/registrations/:id', async (req, res) => {
    try {
        const registrations = await loadRegistrations();
        const filtered = registrations.filter(r => r.id !== req.params.id);
        
        const saved = await saveRegistrations(filtered);
        if (saved) {
            res.json({ success: true });
        } else {
            res.status(500).json({ error: 'Failed to delete registration' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete registration' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start server
async function startServer() {
    await ensureDataFile();
    
    app.listen(PORT, () => {
        console.log(`🚀 Demo Reboot Backend running on port ${PORT}`);
        console.log(`📊 API Endpoints:`);
        console.log(`   GET  /api/registrations - Get all registrations`);
        console.log(`   POST /api/registrations - Add new registration`);
        console.log(`   GET  /api/stats - Get statistics`);
        console.log(`   DELETE /api/registrations/:id - Delete registration`);
        console.log(`   GET  /api/health - Health check`);
        console.log(`\n💾 Data stored in: ${DATA_FILE}`);
        console.log(`🌐 Server URL: http://localhost:${PORT}`);
        console.log(`🔧 Admin Dashboard: http://localhost:${PORT}/admin-registrations.html`);
    });
}

startServer().catch(console.error);
