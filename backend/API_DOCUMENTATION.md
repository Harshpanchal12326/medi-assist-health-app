# MediAssist API Documentation

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

Request:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "patient"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
\`\`\`

### Login
**POST** `/api/auth/login`

Request:
\`\`\`json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
\`\`\`

### Get Current User
**GET** `/api/auth/me`

Headers: `Authorization: Bearer jwt_token_here`

Response:
\`\`\`json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "patient",
  "phone": "1234567890",
  "dateOfBirth": "1990-01-15",
  "gender": "Male",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001"
}
\`\`\`

## Doctor Endpoints

### Get All Doctors
**GET** `/api/doctors`

Response:
\`\`\`json
[
  {
    "_id": "doctor_id",
    "userId": {
      "_id": "user_id",
      "name": "Dr. Smith",
      "email": "dr.smith@example.com",
      "phone": "9876543210"
    },
    "specialization": "Cardiology",
    "experience": 10,
    "qualifications": ["MBBS", "MD"],
    "hospital": "City Hospital",
    "consultationFee": 500,
    "rating": 4.5,
    "totalReviews": 150
  }
]
\`\`\`

### Get Doctors by Specialization
**GET** `/api/doctors/specialization/{specialization}`

Parameters:
- `specialization`: Doctor's specialization (e.g., "Cardiology", "Pediatrics")

Response: Array of doctors matching the specialization

### Create Doctor Profile
**POST** `/api/doctors`

Headers: `Authorization: Bearer jwt_token_here`

Request:
\`\`\`json
{
  "specialization": "Cardiology",
  "experience": 10,
  "qualifications": ["MBBS", "MD"],
  "hospital": "City Hospital",
  "consultationFee": 500,
  "availableSlots": [
    {
      "day": "Monday",
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ],
  "bio": "Expert cardiologist with 10 years experience"
}
\`\`\`

## Appointment Endpoints

### Book Appointment
**POST** `/api/appointments`

Headers: `Authorization: Bearer jwt_token_here`

Request:
\`\`\`json
{
  "doctorId": "doctor_id",
  "appointmentDate": "2024-12-20",
  "timeSlot": "09:00 AM",
  "reason": "Routine check-up"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Appointment booked",
  "appointment": {
    "_id": "appointment_id",
    "patientId": "patient_id",
    "doctorId": "doctor_id",
    "appointmentDate": "2024-12-20",
    "timeSlot": "09:00 AM",
    "reason": "Routine check-up",
    "status": "scheduled"
  }
}
\`\`\`

### Get Patient Appointments
**GET** `/api/appointments/patient/{patientId}`

Headers: `Authorization: Bearer jwt_token_here`

Response: Array of patient's appointments

### Cancel Appointment
**PUT** `/api/appointments/{appointmentId}/cancel`

Headers: `Authorization: Bearer jwt_token_here`

Response:
\`\`\`json
{
  "message": "Appointment cancelled",
  "appointment": {
    "_id": "appointment_id",
    "status": "cancelled"
  }
}
\`\`\`

## Medical Records Endpoints

### Upload Medical Record
**POST** `/api/medical-records`

Headers: `Authorization: Bearer jwt_token_here`

Request:
\`\`\`json
{
  "recordType": "prescription",
  "title": "Blood Pressure Medication",
  "description": "Prescribed for hypertension",
  "prescription": {
    "medicines": [
      {
        "name": "Lisinopril",
        "dosage": "10mg",
        "duration": "30 days"
      }
    ],
    "doctor": "Dr. Smith",
    "date": "2024-12-15"
  }
}
\`\`\`

### Get Patient Medical Records
**GET** `/api/medical-records/{patientId}`

Headers: `Authorization: Bearer jwt_token_here`

Response: Array of patient's medical records

## Reminder Endpoints

### Send Appointment Reminder
**POST** `/api/reminders/send`

Headers: `Authorization: Bearer jwt_token_here`

Request:
\`\`\`json
{
  "email": "patient@example.com",
  "appointmentDate": "2024-12-20",
  "doctorName": "Dr. Smith"
}
\`\`\`

Response:
\`\`\`json
{
  "message": "Reminder sent successfully"
}
\`\`\`

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing/invalid token
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error Response Format:
\`\`\`json
{
  "message": "Error description"
}
