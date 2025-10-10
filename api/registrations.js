// Supabase configuration
const SUPABASE_URL = 'https://ysnsqrskyzdgwfxtemuf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbnNxcnNreXpkZ3dmeHRlbXVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNjc2MzQsImV4cCI6MjA3NTY0MzYzNH0.eLd9FY5JonKLn1pN6yWkm93xpXG4sKTM7A6DjEFgQSA';

export default async function handler(req, res) {
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
            // Get registrations from Supabase
            const response = await fetch(`${SUPABASE_URL}/rest/v1/registrations?select=*`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (response.ok) {
                const registrations = await response.json();
                res.status(200).json(registrations);
            } else {
                console.error('Supabase GET error:', await response.text());
                res.status(200).json([]);
            }
        } else if (req.method === 'POST') {
            const newRegistration = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toISOString(),
                ...req.body
            };
            
            console.log('NEW REGISTRATION RECEIVED');
            console.log('Registration ID:', newRegistration.id);
            console.log('Name:', newRegistration.name);
            console.log('Email:', newRegistration.email);
            console.log('Company:', newRegistration.company);
            console.log('Participant Type:', newRegistration.participant_type);
            console.log('Roles:', JSON.stringify(newRegistration.role));
            console.log('Experience:', newRegistration.experience);
            console.log('Interests:', JSON.stringify(newRegistration.interests));
            console.log('Contact Preference:', newRegistration.contact_preference);
            console.log('Sponsorship Interest:', newRegistration.sponsorship_interest);
            console.log('Hack Interest:', newRegistration.hack_interest);
            console.log('Equipment:', newRegistration.equipment);
            console.log('Creator Type:', JSON.stringify(newRegistration.creator_type));
            console.log('Attendance Days:', JSON.stringify(newRegistration.attendance_days));
            console.log('Topic Suggestion:', newRegistration.topic_suggestion);
            console.log('Comments:', newRegistration.comments);
            console.log('Terms Accepted:', newRegistration.terms);
            console.log('GDPR Consent:', newRegistration.gdpr_consent);
            
            console.log('COPY THIS REGISTRATION:', JSON.stringify(newRegistration));
            
            // Save to Supabase database
            const dbResponse = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRegistration)
            });
            
            if (dbResponse.ok) {
                res.status(200).json({ 
                    success: true, 
                    id: newRegistration.id,
                    message: "Registration saved to database successfully! Data is now permanent.",
                    dataLogged: true,
                    persistent: true
                });
            } else {
                const errorText = await dbResponse.text();
                console.error('Supabase POST error:', errorText);
                res.status(200).json({ 
                    success: true, 
                    id: newRegistration.id,
                    message: "Registration received! (Database save failed, but data logged to console)",
                    dataLogged: true,
                    persistent: false,
                    error: errorText
                });
            }
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API ERROR:', error);
        console.error('Error details:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ error: 'Internal server error' });
    }
}
