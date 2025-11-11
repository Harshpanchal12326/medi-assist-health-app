export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">⚕️ MediAssist</h1>
          <p className="text-2xl text-gray-700 mb-4">Digital Health Record & Appointment Tracker</p>
          <p className="text-lg text-gray-600 mb-8">
            A comprehensive healthcare management application for patients to store medical records, book doctor
            appointments, and track health history.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Quick Start Guide</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">1. Backend Setup</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {`cd backend
npm install
cp .env.example .env
# Update .env with MongoDB connection string
npm start`}
              </pre>
              <p className="text-gray-600 mt-2">Backend runs on: http://localhost:5000</p>
            </div>

            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">2. Frontend Setup</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {`cd frontend
npm install
npm start`}
              </pre>
              <p className="text-gray-600 mt-2">Frontend runs on: http://localhost:3000</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Key Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-3xl">🔐</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Secure Authentication</h3>
                <p className="text-gray-600">JWT tokens & bcrypt password hashing</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">👨‍⚕️</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Doctor Directory</h3>
                <p className="text-gray-600">Browse and filter doctors by specialization</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">📅</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Appointment Booking</h3>
                <p className="text-gray-600">Schedule and manage appointments easily</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">📋</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Medical Records</h3>
                <p className="text-gray-600">Store prescriptions and test results</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🌙</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Theme Switching</h3>
                <p className="text-gray-600">Light, Dark, and Default themes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Responsive Design</h3>
                <p className="text-gray-600">Works on all devices seamlessly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Tech Stack</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frontend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ React.js</li>
                <li>✓ CSS (with theme support)</li>
                <li>✓ Axios (API calls)</li>
                <li>✓ React Router (navigation)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Backend</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Node.js & Express.js</li>
                <li>✓ MongoDB & Mongoose</li>
                <li>✓ JWT Authentication</li>
                <li>✓ bcryptjs (Password hashing)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Structure */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">Project Structure</h2>

          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm font-mono">
            {`mediassist/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   ├── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/       # Dashboard, Doctors, Appointments
    │   ├── components/  # Reusable UI components
    │   ├── styles/      # CSS with theme support
    │   └── App.jsx      # Main application
    └── package.json`}
          </pre>
        </div>

        {/* API Endpoints */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">API Endpoints</h2>

          <div className="space-y-4 text-sm">
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="font-bold text-gray-800">Authentication</p>
              <p className="text-gray-600">POST /api/auth/register | /api/auth/login | GET /api/auth/me</p>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <p className="font-bold text-gray-800">Doctors</p>
              <p className="text-gray-600">
                GET /api/doctors | GET /api/doctors/specialization/:spec | POST /api/doctors
              </p>
            </div>

            <div className="border-l-4 border-yellow-600 pl-4">
              <p className="font-bold text-gray-800">Appointments</p>
              <p className="text-gray-600">
                POST /api/appointments | GET /api/appointments/patient/:id | PUT /api/appointments/:id/cancel
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-4">
              <p className="font-bold text-gray-800">Medical Records</p>
              <p className="text-gray-600">POST /api/medical-records | GET /api/medical-records/:patientId</p>
            </div>
          </div>
        </div>

        {/* Environment Setup */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Environment Configuration</h2>

          <div className="space-y-4">
            <div>
              <p className="font-bold text-gray-800">Backend (.env)</p>
              <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
                {`MONGODB_URI=mongodb://localhost:27017/mediassist
JWT_SECRET=your_jwt_secret_key_here
PORT=5000`}
              </pre>
            </div>

            <div>
              <p className="font-bold text-gray-800">Frontend (.env)</p>
              <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
                {`REACT_APP_API_URL=http://localhost:5000/api`}
              </pre>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Getting Started</h2>

          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-4">
              <span className="font-bold text-green-600">1.</span>
              <span>Ensure MongoDB is running locally or have an Atlas connection string</span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">2.</span>
              <span>
                Navigate to <code className="bg-gray-100 px-2 py-1 rounded">backend</code> folder and run{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">npm install</code>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">3.</span>
              <span>
                Create <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file and add MongoDB URI
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">4.</span>
              <span>
                Start backend with <code className="bg-gray-100 px-2 py-1 rounded">npm start</code> (runs on port 5000)
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">5.</span>
              <span>
                In another terminal, navigate to <code className="bg-gray-100 px-2 py-1 rounded">frontend</code> folder
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">6.</span>
              <span>
                Run <code className="bg-gray-100 px-2 py-1 rounded">npm install</code> then{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">npm start</code>
              </span>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-green-600">7.</span>
              <span>
                Open <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000</code> in your browser
              </span>
            </li>
          </ol>
        </div>
      </div>
    </main>
  )
}
