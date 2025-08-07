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



const router = createBrowserRouter([

  
  {
    path: "/",
    element: (
      <Main />
    ),
    children: [
      {
        path: "", element:
          <Home />
      },
      {
        path: "dashboard", element:
          <Dashboard />
      },
      {
        path: "doctorpage", element:
          <Doctor />
      },
      {
        path: "pharmacypage", element:
          <Pharmacy />
      },
      {
        path: "about-us", element:
          <AboutUs />
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

    ],
  },




  {
    path: "/admin",
    element: (
      <AdminLayout />
    ),
    children: [
      // Add admin routes here
      {
        path: "",
        element: <AdminDashboard />
      },
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
    ],
  }


]);

export default router;
