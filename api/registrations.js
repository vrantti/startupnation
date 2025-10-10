// In-memory storage for registrations (temporary solution)
let registrations = [];

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
            res.status(200).json(registrations);
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
            
            // Store registration in memory
            registrations.push(newRegistration);
            
            res.status(200).json({ 
                success: true, 
                id: newRegistration.id,
                message: "Registration received successfully! View live dashboard for all data.",
                dataLogged: true,
                totalRegistrations: registrations.length
            });
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
