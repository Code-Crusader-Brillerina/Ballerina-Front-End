import { createBrowserRouter } from "react-router-dom";

// Layouts
import Main from "../layout/Main";
import AdminLayout from "../layout/AdminLayout";
import DoctorLayout from "../layout/DoctorLayout";
import PharmacyLayout from "../layout/PharmacyLayout";


import AdminDashboard from "../pages/Admin/AdminDashboard";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import PharmacyDashboard from "../pages/Pharmacy/PharmacyDashboard";


// Patient Pages
import Home from "../pages/Patient/Home";
import Doctor from "../pages/Patient/Doctor";
import Dashboard from "../pages/Patient/Dashboard";
import Pharmacy from "../pages/Patient/Pharmacy";
import AboutUs from "../pages/Patient/AboutUs";
import Appointment from "../pages/Patient/Appointment";
import AppointmentPaymentPage from "../pages/Patient/AppointmentPaymentPage";
import VideoConference from "../pages/Patient/VideoConference";
import PrescriptionPage from "../pages/Patient/PrescriptionPage";
import PharmacyDelivery from "../pages/Patient/PharmacyDelivery";
import PrescriptionPayment from "../pages/Patient/PrescriptionPayment";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminPatient from "../pages/Admin/AdminPatient";
import AdminDoctor from "../pages/Admin/AdminDoctor";
import AdminPharmacy from "../pages/Admin/AdminPharmacy";
import AdminNotification from "../pages/Admin/AdminNotification";
import AdminMedicine from "../pages/Admin/AdminMedicine";
import AdminTransaction from "../pages/Admin/AdminTransaction";
import TodayQue from "../pages/Doctor/Today-Que";
import DoctorAppointment from "../pages/Doctor/DoctorAppointment";
import DoctorNotification from "../pages/Doctor/DoctorNotification";
import DoctorVideoConference from "../pages/Doctor/DoctorVideoConference";
import DoctorPatientDetails from "../pages/Doctor/DoctorPatientDetails";
import DoctorAddPrescription from "../pages/Doctor/DoctorAddPrescription";
import PharmacyMedicineStock from "../pages/Pharmacy/PharmacyMedicineStock";
import PharmacyPrescription from "../pages/Pharmacy/PharmacyPrescription";
import PharmacyNotification from "../pages/Pharmacy/PharmacyNotification";
import PharmacyPrescriptionDetails from "../pages/Pharmacy/PharmacyPrescriptionDetails";





const router = createBrowserRouter([


  {
    path: "/login",
    element: (
      <Login />
    ),
  },

  {
    path: "/signup",
    element: (
      <Signup />
    ),
  },


  {
    path: "/",
    element: (
      <Main />
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "doctorpage",
        element: <Doctor />
      },
      {
        path: "pharmacypage",
        element: <Pharmacy />
      },
      {
        path: "about-us",
        element: <AboutUs />
      },
      {
        path: "doctorpage/:doctorName/appointment",
        element: <Appointment />,
      },
      {
        path: "appointment/payment",
        element: <AppointmentPaymentPage />,
      },
      {
        path: "video-conference/:doctorName",
        element: <VideoConference />,
      },
      {
        path: "prescription/:id",
        element: <PrescriptionPage />,
      },
      {
        path: "pharmacy/:pharmacyName/delivery",
        element: <PharmacyDelivery />,
      },
      {
        path: "prescription/payment",
        element: <PrescriptionPayment />,
      },

    ],
  },




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




  {
    path: "/doctor",
    element: (
      <DoctorLayout />
    ),
    children: [
      {
        path: "",
        element:
          <DoctorDashboard />
      },
      {
        path: "today-que",
        element:
          <TodayQue />
      },
      {
        path: "appointments",
        element:
          <DoctorAppointment />
      },
      {
        path: "notifications",
        element:
          <DoctorNotification />
      },
      {
        path: "video-conference",
        element:
          <DoctorVideoConference />
      },
      {
        path: "patient-details",
        element:
          <DoctorPatientDetails />
      },
      {
        path: "add-prescription",
        element:
          <DoctorAddPrescription />
      },
    ],
  },





  {
    path: "/pharmacy",
    element: (
      <PharmacyLayout />
    ),
    children: [
      {
        path: "",
        element: <PharmacyDashboard />
      },
      {
        path: "medicine-stock",
        element: <PharmacyMedicineStock />
      },
      {
        path: "prescription",
        element: <PharmacyPrescription />
      },
      {
        path: "notifications",
        element: <PharmacyNotification />
      },
      {
        path: "pharmacyprescriptiondetails/:id",
        element: <PharmacyPrescriptionDetails />
      }
    ],
  }


]);

export default router;
