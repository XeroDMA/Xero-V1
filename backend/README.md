# XERODMA Staff Panel Backend

This is the backend API for the XERODMA staff panel system, providing authentication, file management, and guides functionality.

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

2. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials and configuration
   \`\`\`

3. **Database Setup**
   \`\`\`bash
   npm run setup
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Staff login
- `GET /api/auth/session` - Check session
- `POST /api/auth/logout` - Logout

### File Management
- `GET /api/files` - Get all files (staff only)
- `POST /api/files/upload` - Upload file (staff only)
- `GET /api/files/download/:token` - Download file (public with access key)
- `DELETE /api/files/:id` - Delete file (staff only)

### Guides
- `GET /api/guides` - Get public guides
- `POST /api/guides/:id/access` - Access guide content (with password if needed)
- `GET /api/guides/manage` - Get all guides for management (staff only)
- `POST /api/guides/manage` - Create guide (staff only)
- `PUT /api/guides/manage/:id` - Update guide (staff only)
- `DELETE /api/guides/manage/:id` - Delete guide (staff only)

## Default Credentials
- Username: `admin`
- Password: `admin123`

## File Structure
\`\`\`
backend/
├── server.js              # Main server file
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── files.js          # File management routes
│   └── guides.js         # Guides routes
├── middleware/           # Express middleware
│   └── auth.js          # Authentication middleware
├── database/            # Database related files
│   ├── connection.js    # Database connection
│   └── schema.sql       # Database schema
├── scripts/             # Utility scripts
│   └── setup.js         # Database setup script
├── uploads/             # File upload directory
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── README.md           # This file
