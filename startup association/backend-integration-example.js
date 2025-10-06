// Backend Integration Example for Demo Reboot Registration
// This shows how to integrate the frontend form with a real backend

// Example 1: Simple Fetch API integration
async function submitRegistrationToBackend(formData) {
    try {
        const response = await fetch('/api/demo-reboot/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Registration submission failed:', error);
        return { success: false, error: error.message };
    }
}

// Example 2: FormData submission (for file uploads)
async function submitRegistrationWithFiles(formData) {
    try {
        const response = await fetch('/api/demo-reboot/register', {
            method: 'POST',
            body: formData // FormData object
        });
        
        return await response.json();
    } catch (error) {
        console.error('Registration with files failed:', error);
        return { success: false, error: error.message };
    }
}

// Example 3: Email notification integration
async function sendRegistrationEmail(registrationData) {
    try {
        const response = await fetch('/api/email/send-confirmation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: registrationData.email,
                template: 'demo-reboot-confirmation',
                data: registrationData
            })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.message };
    }
}

// Example 4: Database integration (Node.js/Express example)
/*
// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Initialize database
const db = new sqlite3.Database('demo-reboot.db');

// Create registrations table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        participant_type TEXT NOT NULL,
        role TEXT,
        experience TEXT,
        interests TEXT,
        contact_preference TEXT,
        sponsorship_interest TEXT,
        hack_interest TEXT,
        message TEXT,
        newsletter BOOLEAN,
        terms BOOLEAN NOT NULL,
        UNIQUE(email)
    )`);
});

// Registration endpoint
app.post('/api/demo-reboot/register', express.json(), (req, res) => {
    const {
        name, email, phone, company, participant_type, role, experience,
        interests, contact_preference, sponsorship_interest, hack_interest,
        message, newsletter, terms
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !participant_type || !terms) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Insert into database
    const stmt = db.prepare(`
        INSERT INTO registrations 
        (name, email, phone, company, participant_type, role, experience,
         interests, contact_preference, sponsorship_interest, hack_interest,
         message, newsletter, terms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    stmt.run([
        name, email, phone, company, participant_type, role, experience,
        JSON.stringify(interests), contact_preference, sponsorship_interest,
        hack_interest, message, newsletter, terms
    ], function(err) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Registration failed' });
        }
        
        res.json({ 
            success: true, 
            id: this.lastID,
            message: 'Registration successful' 
        });
    });
    
    stmt.finalize();
});

// Get registrations endpoint
app.get('/api/demo-reboot/registrations', (req, res) => {
    db.all('SELECT * FROM registrations ORDER BY timestamp DESC', (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch registrations' });
        }
        
        res.json(rows);
    });
});

// Get statistics endpoint
app.get('/api/demo-reboot/stats', (req, res) => {
    db.all(`
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN participant_type = 'guest' THEN 1 ELSE 0 END) as guests,
            SUM(CASE WHEN participant_type = 'sponsor' THEN 1 ELSE 0 END) as sponsors,
            SUM(CASE WHEN participant_type = 'hacker' THEN 1 ELSE 0 END) as hackers,
            SUM(CASE WHEN sponsorship_interest LIKE '%yes%' THEN 1 ELSE 0 END) as sponsorship_interested,
            SUM(CASE WHEN hack_interest LIKE '%yes%' THEN 1 ELSE 0 END) as hack_interested
        FROM registrations
    `, (err, rows) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch stats' });
        }
        
        res.json(rows[0]);
    });
});

app.listen(3000, () => {
    console.log('Demo Reboot registration server running on port 3000');
});
*/

// Example 5: Integration with the existing frontend form
function integrateWithBackend() {
    // Replace the existing form submission in script.js with this:
    const demoRebootForm = document.getElementById('demoRebootForm');
    if (demoRebootForm) {
        demoRebootForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.punk-button');
            const originalText = submitButton.innerHTML;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Validate required fields
            const requiredFields = ['name', 'email', 'participant_type', 'terms'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showNotification('Please fill in all required fields marked with *.', 'error');
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalText;
                return;
            }
            
            // Submit to backend
            const result = await submitRegistrationToBackend(data);
            
            if (result.success) {
                // Store locally as backup
                storeRegistrationData(data);
                
                // Send confirmation email
                await sendRegistrationEmail(data);
                
                showNotification('🎉 Welcome to the Revolution! You\'re now registered for Demo Reboot 2025. Check your email for confirmation details.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showNotification('Registration failed. Please try again or contact support.', 'error');
            }
            
            // Reset button
            submitButton.classList.remove('loading');
            submitButton.innerHTML = originalText;
        });
    }
}

// Example 6: Real-time updates with WebSocket
/*
const socket = io(); // If using Socket.IO

socket.on('registration-update', (data) => {
    updateRegistrationCounter();
    showNotification(`New registration: ${data.name} joined as ${data.participant_type}!`, 'info');
});

socket.on('stats-update', (stats) => {
    updateStatsDisplay(stats);
});
*/

// Example 7: Export to various formats
async function exportRegistrationsFromBackend(format = 'json') {
    try {
        const response = await fetch(`/api/demo-reboot/export?format=${format}`);
        const blob = await response.blob();
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `demo-reboot-registrations.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showNotification(`Exported registrations as ${format.toUpperCase()}`, 'success');
    } catch (error) {
        console.error('Export failed:', error);
        showNotification('Export failed. Please try again.', 'error');
    }
}

// Usage instructions:
console.log(`
🚀 Demo Reboot Backend Integration Guide:

1. LOCAL STORAGE (Current Implementation):
   - Data is stored in browser's localStorage
   - Access via admin panel (🎛️ button in top-right)
   - Export as JSON or CSV
   - Perfect for testing and small events

2. BACKEND INTEGRATION:
   - Replace localStorage with API calls
   - Use the examples above for Node.js/Express
   - Add database storage (SQLite, PostgreSQL, etc.)
   - Implement email notifications
   - Add real-time updates with WebSocket

3. CLOUD SOLUTIONS:
   - Firebase Firestore
   - Supabase
   - Airtable API
   - Google Sheets API
   - Mailchimp integration

4. SECURITY CONSIDERATIONS:
   - Validate all inputs server-side
   - Rate limiting for form submissions
   - CSRF protection
   - Email verification
   - GDPR compliance

5. MONITORING:
   - Track registration metrics
   - Monitor form completion rates
   - Set up alerts for high registration volumes
   - Analytics integration

Current data structure includes:
- Basic info (name, email, phone, company)
- Participant type (guest, sponsor, hacker)
- Professional role and experience
- Interests and preferences
- Contact preferences
- Sponsorship and hack interests
- Additional comments
- Timestamp and unique ID
`);
