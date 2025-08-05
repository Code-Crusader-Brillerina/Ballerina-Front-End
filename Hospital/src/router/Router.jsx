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
        path: "doctorpage", element:
          <Doctor />
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
