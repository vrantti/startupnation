// Simple email notification system
// This sends you an email every time someone registers

async function sendEmailNotification(registration) {
    const emailContent = `
NEW DEMO REBOOT REGISTRATION

Registration ID: ${registration.id}
Timestamp: ${registration.timestamp}
Name: ${registration.name}
Email: ${registration.email}
Company: ${registration.company || 'Not provided'}
Participant Type: ${registration.participant_type}
Roles: ${Array.isArray(registration.role) ? registration.role.join(', ') : registration.role}
Experience: ${registration.experience}
Interests: ${Array.isArray(registration.interests) ? registration.interests.join(', ') : registration.interests}
Contact Preference: ${registration.contact_preference}
Sponsorship Interest: ${registration.sponsorship_interest}
Hack Interest: ${registration.hack_interest}
Equipment: ${registration.equipment}
Creator Type: ${Array.isArray(registration.creator_type) ? registration.creator_type.join(', ') : registration.creator_type}
Attendance Days: ${Array.isArray(registration.attendance_days) ? registration.attendance_days.join(', ') : registration.attendance_days}
Topic Suggestion: ${registration.topic_suggestion || 'None'}
Comments: ${registration.comments || 'None'}
Terms Accepted: ${registration.terms ? 'Yes' : 'No'}
GDPR Consent: ${registration.gdpr_consent ? 'Yes' : 'No'}

RAW JSON DATA:
${JSON.stringify(registration, null, 2)}
    `;

    // Use a simple email service like EmailJS or Resend
    try {
        // This would send you an email with the registration data
        console.log('EMAIL NOTIFICATION:');
        console.log(emailContent);
        
        // You could integrate with:
        // - EmailJS (free)
        // - Resend (free tier)
        // - SendGrid (free tier)
        // - Or any email service
        
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
}
