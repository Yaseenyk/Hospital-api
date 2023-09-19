# Hospital API

The Hospital API is designed for the management of COVID-19 patient data and reports. It allows doctors to register patients, create reports for them, and retrieve patient reports by status.

## Tech Stack

- Node.js
- MongoDB
- Express.js
- JSON Web Tokens (JWT) for authentication

## Getting Started

To run the Hospital API locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally

### Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/yourusername/hospital-api.git
   cd hospital-api

The API will be available at http://localhost:500.

Use an API testing tool like Postman to interact with the endpoints.

API Endpoints
Doctor Routes:

POST /api/doctors/register: Register a doctor.
POST /api/doctors/login: Log in and receive a JWT token.
Patient Routes:

POST /api/patients/register: Register a patient.
POST /api/patients/:id/create_report: Create a patient report.
GET /api/patients/:id/all_reports: List all reports of a patient.
Report Routes:

GET /api/reports/:status: List all reports of all patients filtered by a specific status.
Testing
You can use a tool like Postman to test the API endpoints. Refer to the Postman section below for sample requests.

Sample Requests
Patient Registration
URL: POST http://localhost:3000/api/patients/register

Body (JSON):

json
Copy code
{
  "phoneNumber": "1234567890"
}
Patient Report Creation
URL: POST http://localhost:3000/api/patients/PATIENT_ID/create_report
(Replace PATIENT_ID with the actual patient ID)

Headers:

Authorization: Bearer YOUR_DOCTOR_JWT_TOKEN
Body (JSON):

json
Copy code
{
  "status": "Positive-Admit"
}
Get All Reports for a Patient
URL: GET http://localhost:3000/api/patients/PATIENT_ID/all_reports
(Replace PATIENT_ID with the actual patient ID)
Headers:
Authorization: Bearer YOUR_PATIENT_JWT_TOKEN
Get Reports by Status
URL: GET http://localhost:3000/api/reports/Positive-Admit