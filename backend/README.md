# Demo Reboot Backend

Simple Node.js backend for storing Demo Reboot registrations.

## Quick Start

1. **Install Node.js** (if not already installed):
   - Download from https://nodejs.org/
   - Choose the LTS version

2. **Start the backend**:
   - Double-click `start-backend.bat` (Windows)
   - Or run manually:
     ```bash
     cd backend
     npm install
     npm start
     ```

3. **Backend will run on**: http://localhost:3001

## API Endpoints

- `GET /api/registrations` - Get all registrations
- `POST /api/registrations` - Add new registration
- `GET /api/stats` - Get statistics
- `DELETE /api/registrations/:id` - Delete registration

## Data Storage

- Registrations are stored in `registrations.json`
- File is automatically created when first registration is made
- Data persists between server restarts

## Usage

1. Start the backend server
2. Open `demo-reboot.html` in your browser
3. Fill out the registration form
4. Open `admin-registrations.html` to view registrations
5. Password: `demoreboot2025`

## Troubleshooting

- **"Error loading registrations"**: Make sure backend is running on port 3001
- **"Registration failed"**: Check browser console for errors
- **Port already in use**: Change PORT in `server.js` to another number (like 3002)

## Production Deployment

For production use, consider:
- Using a proper database (PostgreSQL, MongoDB)
- Adding authentication/authorization
- Setting up HTTPS
- Adding rate limiting
- Using environment variables for configuration
