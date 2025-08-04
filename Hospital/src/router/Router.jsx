import { createBrowserRouter } from "react-router-dom";

// Layouts
import Main from "../layout/Main";
import Admin from "../layout/Admin";
import Home from "../pages/Patient/Home";
import Doctor from "../layout/Doctor";
import Pharmacy from "../layout/Pharmacy";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import DoctorDashboard from "../pages/Doctor/DoctorDashboard";
import PharmacyDashboard from "../pages/Pharmacy/PharmacyDashboard";




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
    ],
  },




  {
    path: "/admin",
    element: (
      <Admin />
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
      <Doctor />
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
      <Pharmacy />
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
