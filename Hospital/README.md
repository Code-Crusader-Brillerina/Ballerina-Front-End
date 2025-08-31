# 🏥 Hospital Management Frontend

A modern, scalable, and role-based hospital management frontend built with **React 19**, **Vite**, **TailwindCSS**, and **React Router v7**.  
This application supports multiple roles: **Patient, Doctor, Pharmacy, and Admin**, with protected routes and dashboards.

---

## 🚀 Demo


---

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚦 Application Routes](#-application-routes)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [🎯 Usage](#-usage)
- [📜 Scripts](#-scripts)
- [🔌 API Integration](#-api-integration)
- [🏗️ Architecture Overview](#-architecture-overview)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)
- [📞 Support](#-support)
- [🚀 Deployment](#-deployment)
- [🔧 Development Notes](#-development-notes)

---

## ✨ Features

### 👨‍💼 Admin Features
- **Dashboard:** Manage users, doctors, pharmacies, and transactions
- **Patient Management:** Approve, update, and remove patients
- **Doctor Management:** Onboard, approve, and track doctors
- **Pharmacy Management:** Manage pharmacies, medicines, and stock
- **Transaction History:** Track all payments and transactions
- **Notifications & Settings**

### 🩺 Doctor Features
- **Dashboard:** Today’s queue & upcoming appointments
- **Appointment Management:** Accept/reject patient bookings
- **Video Consultations**
- **Notifications**
- **Patient Details Viewer**

### 💊 Pharmacy Features
- **Medicine Stock Management**
- **Prescription Handling**
- **Notifications**
- **Order & Delivery Tracking**

### 👤 Patient Features
- **Dashboard:** View upcoming appointments and prescriptions
- **Book Appointments** with doctors
- **Video Consultations**
- **Prescription & Pharmacy Orders**
- **Payments (Stripe Integration)**

### 🔒 Common Features
- **Role-Based Access Control**
- **Protected Routes**
- **Responsive Design**
- **Multi-Layout Architecture**
- **PDF Export (jspdf + html2canvas)**
- **Context-Based State Management**

---

## 🛠 Tech Stack

### ⚛️ Frontend Framework & Core
- **Framework:** React 19 + Vite 7
- **Styling:** TailwindCSS 4
- **Routing:** React Router DOM v7
- **Icons:** lucide-react & react-icons

### 📦 State Management & Data Fetching
- **HTTP Client:** Axios 1.11
- **Context API:** Global state management
- **Authentication:** JWT-based protected routes

### 📊 UI Components & Libraries
- **Charts:** Recharts, react-chartjs-2
- **Calendar:** react-calendar
- **PDF Generation:** jspdf + html2canvas
- **Payments:** Stripe React SDK

### 🔧 Development Tools
- **Linting:** ESLint 9
- **Formatting:** Prettier
- **Type Checking:** React Types

---

## 📁 Project Structure
```bash
src
│
├── assets
│   └── react.svg
│
├── components
│   │
│   ├── Admin
│   │   ├── AdminDashboard
│   │   │   ├── ChartCard.jsx
│   │   │   └── MetricCard.jsx
│   │   │
│   │   ├── AdminDoctor
│   │   │   └── AddDoctorModal.jsx
│   │   │
│   │   ├── AdminMedicine
│   │   │   └── AddMedicineModal.jsx
│   │   │
│   │   ├── AdminNotification
│   │   │   └── AddNotificationModal.jsx
│   │   │
│   │   ├── AdminPharmacy
│   │   │   └── AddPharmacyModal.jsx
│   │   │
│   │   └── AdminSidebar.jsx
│   │
│   ├── Doctor
│   │   ├── DoctorAddPrescription
│   │   │   └── PrescriptionRow.jsx
│   │   │
│   │   ├── DoctorAppointment
│   │   │   └── AppointmentCard.jsx
│   │   │
│   │   ├── DoctorDashboard
│   │   │   ├── ChartCard.jsx
│   │   │   └── MetricCard.jsx
│   │   │
│   │   ├── DoctorPatientDetails
│   │   │
│   │   ├── DoctorQue
│   │   │   ├── CalendarSection.jsx
│   │   │   ├── PatientCard.jsx
│   │   │   ├── PatientFilters.jsx
│   │   │   └── StatsSection.jsx
│   │   │
│   │   ├── DoctorVideoConference
│   │   │
│   │   └── DoctorSidebar.jsx
│   │
│   ├── Patient
│   │   ├── aboutusPage
│   │   │   ├── AboutSection.jsx
│   │   │   ├── MissionSection.jsx
│   │   │   └── TeamSection.jsx
│   │   │
│   │   ├── dashboardPage
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── AppointmentSection.jsx
│   │   │   ├── CompletedAppointment.jsx
│   │   │   ├── DeliveryProgress.jsx
│   │   │   └── PrescriptionSection.jsx
│   │   │
│   │   ├── doctorPage
│   │   │   ├── DoctorCard.jsx
│   │   │   └── SearchFilter.jsx
│   │   │
│   │   ├── pharmacyPage
│   │   │   └── PharmacyCard.jsx
│   │   │
│   │   ├── prescriptionPage
│   │   │   ├── PharmacyCard.jsx
│   │   │   ├── PrescriptionDetails.jsx
│   │   │   ├── PrescriptionPrintable.jsx
│   │   │   ├── SelectedPharmaciesSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   └── Pagination.jsx
│   │
│   ├── Pharmacy
│   │   ├── PharmacyDashboard
│   │   │   └── MedicineStatusCharts.js
│   │   │
│   │   ├── PharmacyMedicineStock
│   │   │   ├── Header.jsx
│   │   │   ├── MedicineTable.jsx
│   │   │   ├── PharmacyHeader.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   └── StockChart.jsx
│   │   │
│   │   ├── PharmacyPrescription
│   │   │   ├── PrescriptionCard.jsx
│   │   │   └── PrescriptionStats.jsx
│   │   │
│   │   └── PharmacyPrescriptionDetails
│   │       ├── PrescriptionCard.jsx
│   │       ├── PharmacySidebar.jsx
│   │       ├── ChatButton.jsx
│   │       ├── ChatWindow.jsx
│   │       ├── Footer.jsx
│   │       ├── GradientBackground.jsx
│   │       ├── PrivateRoute.jsx
│   │       └── SidebarLink.jsx
│
├── context
│   └── AuthContext.jsx
│
├── layout
│   ├── AdminLayout.jsx
│   ├── DoctorLayout.jsx
│   ├── Main.jsx
│   └── PharmacyLayout.jsx
│
├── pages
│   ├── Admin
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminDoctor.jsx
│   │   ├── AdminMedicine.jsx
│   │   ├── AdminNotification.jsx
│   │   ├── AdminPatient.jsx
│   │   ├── AdminPharmacy.jsx
│   │   └── AdminTransaction.jsx
│   │
│   ├── Doctor
│   │   ├── DoctorAppointment.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorNotification.jsx
│   │   ├── DoctorPatientDetails.jsx
│   │   ├── DoctorVideoConference.jsx
│   │   └── PrescriptionPage.jsx
│   │
│   ├── Patient
│   │   ├── AboutUs.jsx
│   │   ├── Appointment.jsx
│   │   ├── AppointmentPaymentPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Doctor.jsx
│   │   ├── Home.jsx
│   │   ├── Pharmacy.jsx
│   │   ├── PharmacyDelivery.jsx
│   │   ├── PrescriptionPage.jsx
│   │   ├── PrescriptionPayment.jsx
│   │   └── VideoConference.jsx
│   │
│   └── Pharmacy
│       ├── PharmacyDashboard.jsx
│       ├── PharmacyMedicineStock.jsx
│       ├── PharmacyNotification.jsx
│       ├── PharmacyPrescription.jsx
│       └── PharmacyPrescriptionDetails.jsx
│
└── router
    └── Router.jsx

🚦 Application Routes
🌍 Public Routes

/login → Login

/signup → Signup

/ → Home

/about-us → About Us

👤 Patient Routes

/dashboard → Dashboard

/appointment/:did → Book Appointment

/appointment/payment/:aid → Appointment Payment

/video-conference/:doctorName → Video Consultation

/prescription/:id → Prescription Details

/pharmacy/:pharmacyName/delivery → Pharmacy Delivery

👨‍💼 Admin Routes

/admin → Dashboard

/admin/patients → Manage Patients

/admin/doctors → Manage Doctors

/admin/pharmacy → Manage Pharmacies

/admin/medicine → Medicine Catalog

/admin/transaction → Transactions

/admin/notifications → Notifications

🩺 Doctor Routes

/doctor → Dashboard

/doctor/today-que → Today’s Queue

/doctor/appointments → Appointments

/doctor/video-conference → Video Consultations

💊 Pharmacy Routes

/pharmacy → Dashboard

/pharmacy/medicine-stock → Medicine Stock

/pharmacy/prescription → Prescription Handling

📋 Prerequisites

Node.js (16+)

npm (7+) or yarn (1.22+)

Git

🚀 Installation
1. Clone the Repository
    git clone https://github.com/Code-Crusader-Brillerina/Ballerina-Front-End.git
    cd Ballerina-Front-End

2. Install Dependencies
    npm install
    # or
    yarn install

3. Start Development Server
    npm run dev


Open http://localhost:5173

📜 Scripts
    Script	Description
        npm run - dev	Start development server with hot reload
        npm run - build	Build the app for production
        npm run - preview	Preview production build
        npm run - lint	Run ESLint
        🔌 API Integration

    Authentication Service (Port 9094)

    Patient/Doctor/Pharmacy Services (Port 9090)

    Notification Service (Port 9093)

    Dashboard Services (Port 9092)

🏗️ Architecture Overview

    Role-Based Layouts

    Protected Routing

    Service-Oriented API Integration

    Custom Hooks & Context Providers

    PDF/Export Utilities

## 👨‍💻 Collaborators  

    Thanks to the amazing team behind this project:  

- **Eshan Senadhi** - [@eshancool123](https://github.com/eshancool123)  
- **Bihan Siriwardhana** - [@Bihan-Siriwardhana](https://github.com/Bihan-Siriwardhana)  
- **Ravindu Kavishan** - [@Ravindu-Kavishan](https://github.com/Ravindu-Kavishan) 
- **Navod Viduranga Gunathilaka** - [@navo1212](https://github.com/navo1212)  

👥 Team

FiveStackDev ✨
    Core Contributors: To be added

    📞 Support

    📧 Email: your-team@email.com

    🐛 Issues: GitHub Issues

<div align="center">

⭐ Star this repo if you find it helpful! ⭐

