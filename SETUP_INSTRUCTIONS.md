# MediAssist - Digital Health Record & Appointment Tracker

A comprehensive healthcare management application for patients to store medical records, book doctor appointments, and track health history.

## Project Structure

\`\`\`
mediassist/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── server.js        # Express server
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── pages/       # React pages
    │   ├── components/  # React components
    │   ├── styles/      # CSS files
    │   ├── App.jsx      # Main app
    │   └── index.js
    ├── package.json
    └── .env.example
\`\`\`

## Tech Stack

- **Frontend**: React.js, CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcryptjs
- **Notifications**: EmailJS (optional)

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file from `.env.example`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `.env` with your configurations:
   - MongoDB connection string
   - JWT secret
   - Port (default: 5000)

5. Start the server:
   \`\`\`bash
   npm start
   \`\`\`
   
   For development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create `.env` file from `.env.example`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

The frontend will run on `http://localhost:3000`

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing with bcryptjs
- Role-based access (Patient/Doctor)

### Patient Features
- Dashboard with health overview
- Browse and search doctors by specialization
- Book doctor appointments
- View appointment history
- Upload and manage medical records
- Track prescriptions and test results

### Doctor Features
- Create and manage profile
- Set availability slots
- View patient appointments
- Access patient medical history

### Theme Support
- Light theme
- Dark theme
- Default theme
- Theme switching via navbar

## Database Schema

### User Model
\`\`\`javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (patient/doctor/admin),
  phone: String,
  dateOfBirth: Date,
  gender: String,
  address: String,
  createdAt: Date
}
\`\`\`

### Doctor Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  specialization: String,
  experience: Number,
  qualifications: [String],
  hospital: String,
  consultationFee: Number,
  availableSlots: Array,
  bio: String,
  rating: Number,
  totalReviews: Number
}
\`\`\`

### Appointment Model
\`\`\`javascript
{
  patientId: ObjectId (ref: User),
  doctorId: ObjectId (ref: Doctor),
  appointmentDate: Date,
  timeSlot: String,
  reason: String,
  status: String (scheduled/completed/cancelled),
  notes: String,
  reminder: Boolean
}
\`\`\`

### MedicalRecord Model
\`\`\`javascript
{
  patientId: ObjectId (ref: User),
  recordType: String (prescription/test/report),
  title: String,
  description: String,
  fileUrl: String,
  prescription: {
    medicines: Array,
    doctor: String,
    date: Date
  },
  testResults: {
    testName: String,
    result: String,
    date: Date
  },
  createdAt: Date
}
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/specialization/:specialization` - Filter by specialization
- `POST /api/doctors` - Create doctor profile (doctor only)

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/patient/:patientId` - Get patient appointments
- `PUT /api/appointments/:id/cancel` - Cancel appointment

### Medical Records
- `POST /api/medical-records` - Upload medical record
- `GET /api/medical-records/:patientId` - Get patient records

### Reminders
- `POST /api/reminders/send` - Send appointment reminder

## Usage

### Register and Login
1. Navigate to `http://localhost:3000`
2. Register as Patient or Doctor
3. Login with your credentials

### For Patients
1. Go to "Find Doctors" to browse available doctors
2. Filter by specialization
3. Click "Book Appointment" to schedule a visit
4. Manage appointments in the "Appointments" section
5. Upload and track medical records

### Theme Switching
Click the theme button (🌓) in the navbar to switch between Light, Dark, and Default themes.

## Configuration

### MongoDB Setup
- Local: `mongodb://localhost:27017/mediassist`
- MongoDB Atlas: Use your connection string

### EmailJS Setup (Optional)
1. Create account at emailjs.com
2. Create email template
3. Get Service ID, Template ID, and Public Key
4. Update `.env` in backend

## Troubleshooting

**Backend won't start**
- Check MongoDB connection
- Ensure port 5000 is available
- Check .env configuration

**Frontend API errors**
- Verify backend is running on port 5000
- Check CORS configuration
- Clear browser cache

**Authentication issues**
- Clear localStorage: `localStorage.clear()`
- Verify JWT_SECRET matches both files
- Check token expiration

## Future Enhancements

- Video consultation feature
- Prescription auto-delivery
- Health analytics dashboard
- Telemedicine integration
- AI-powered health insights
- Mobile app (React Native)
- Payment gateway integration
- Real-time notifications

## Support

For issues or questions, please create an issue in the repository.

## License

This project is open source and available under the MIT License.
