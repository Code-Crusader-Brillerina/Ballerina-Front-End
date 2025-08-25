import { createBrowserRouter } from "react-router-dom";

// Layouts
import Main from "../layout/Main";
import AdminLayout from "../layout/AdminLayout";
import DoctorLayout from "../layout/DoctorLayout";
import PharmacyLayout from "../layout/PharmacyLayout";

// Shared Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";

// Patient Pages
import Home from "../pages/Patient/Home";
import Dashboard from "../pages/Patient/Dashboard";
import Doctor from "../pages/Patient/Doctor";
import Pharmacy from "../pages/Patient/Pharmacy";
import AboutUs from "../pages/Patient/AboutUs";
import Appointment from "../pages/Patient/Appointment";
import AppointmentPaymentPage from "../pages/Patient/AppointmentPaymentPage";
import VideoConference from "../pages/Patient/VideoConference";
import PrescriptionPage from "../pages/Patient/PrescriptionPage";
import PharmacyDelivery from "../pages/Patient/PharmacyDelivery";
import PrescriptionPayment from "../pages/Patient/PrescriptionPayment";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminPatient from "../pages/Admin/AdminPatient";
import AdminDoctor from "../pages/Admin/AdminDoctor";
import AdminPharmacy from "../pages/Admin/AdminPharmacy";
import AdminNotification from "../pages/Admin/AdminNotification";
import AdminMedicine from "../pages/Admin/AdminMedicine";
import AdminTransaction from "../pages/Admin/AdminTransaction";

// Doctor Pages
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import TodayQue from "../pages/Doctor/Today-Que";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorVideoConference from "../pages/Doctor/DoctorVideoConference";
import DoctorPatientDetails from "../pages/Doctor/DoctorPatientDetails";
// import DoctorAddPrescription from "../pages/Doctor/DoctorAddPrescription";

// Pharmacy Pages
import PharmacyDashboard from "../pages/Pharmacy/PharmacyDashboard";
import PharmacyMedicineStock from "../pages/Pharmacy/PharmacyMedicineStock";
import PharmacyPrescription from "../pages/Pharmacy/PharmacyPrescription";
import PharmacyNotification from "../pages/Pharmacy/PharmacyNotification";

// Helper component for protected routes
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
    // ==========================================
    // PUBLIC ROUTES
    // ==========================================
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },

    // ========================================================
    // MAIN LAYOUT (Contains both public and private pages)
    // ========================================================
    {
        path: "/",
        element: <Main />,
        children: [
            // --- Publicly Accessible Pages ---
            // These are available to everyone, logged in or not.
            { index: true, element: <Home /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "doctorpage", element: <Doctor /> },
            { path: "pharmacypage", element: <Pharmacy /> },

            // --- Protected Pages (Requires ANY logged-in user) ---
            // These are wrapped in PrivateRoute and require authentication.
            {
                element: <PrivateRoute allowedRoles={['patient']} />,
                children: [
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "appointment/:did", element: <Appointment /> },
                    { path: "appointment/payment/:aid", element: <AppointmentPaymentPage /> },
                    { path: "video-conference/:doctorName", element: <VideoConference /> },
                    { path: "prescription/:id", element: <PrescriptionPage /> },
                    { path: "pharmacy/:pharmacyName/delivery", element: <PharmacyDelivery /> },
                    { path: "prescription/payment", element: <PrescriptionPayment /> },
                ]
            }
        ],
    },

    // ========================================================
    // ROLE-SPECIFIC PROTECTED ROUTES
    // ========================================================

    // --- Admin Protected Routes (Requires 'admin' role) ---
    {
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    { path: "", element: <AdminDashboard /> },
                    { path: "transaction", element: <AdminTransaction /> },
                    { path: "patients", element: <AdminPatient /> },
                    { path: "doctors", element: <AdminDoctor /> },
                    { path: "pharmacy", element: <AdminPharmacy /> },
                    { path: "medicine", element: <AdminMedicine /> },
                    { path: "notifications", element: <AdminNotification /> },
                    { path: "settings", element: <AdminDashboard /> },
                ],
            },
        ]
    },

    // --- Doctor Protected Routes (Requires 'doctor' role) ---
    {
        element: <PrivateRoute allowedRoles={['doctor']} />,
        children: [
            {
                path: "/doctor",
                element: <DoctorLayout />,
                children: [
                    { path: "", element: <DoctorDashboard /> },
                    { path: "today-que", element: <TodayQue /> },
                    { path: "appointments", element: <DoctorAppointment /> },
                    { path: "notifications", element: <DoctorNotification /> },
                    { path: "video-conference", element: <DoctorVideoConference /> },
                    { path: "patient-details", element: <DoctorPatientDetails /> },
                    // { path: "add-prescription", element: <DoctorAddPrescription /> },
                ],
            },
        ]
    },

    // --- Pharmacy Protected Routes (Requires 'pharmacy' role) ---
    {
        element: <PrivateRoute allowedRoles={['pharmacy']} />,
        children: [
            {
                path: "/pharmacy",
                element: <PharmacyLayout />,
                children: [
                    { path: "", element: <PharmacyDashboard /> },
                    { path: "medicine-stock", element: <PharmacyMedicineStock /> },
                    { path: "prescription", element: <PharmacyPrescription /> },
                    { path: "notifications", element: <PharmacyNotification /> }
                ],
            },
        ]
    }
]);

export default router;