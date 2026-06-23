import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* Components */
//import PrivateRoute from "../components/PrivateRoute";
//import CustomRoute from "../components/CustomRoute"; 

/* Layout */
import DashboardLayout from "../layouts/DashboardLayout";

/* Public Pages */
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";

/* Dashboard Pages */
import Dashboard from "../pages/Dashboard/Dashboard";
import Investors from "../pages/Investors/Investors";
import Meetings from "../pages/Meetings/Meetings";
import Tasks from "../pages/Tasks/Tasks";
import FollowUps from "../pages/FollowUps/FollowUps";
import Documents from "../pages/Documents/Documents";
import Profile from "../pages/Profile/Profile";
import Team from "../pages/Team/Team";
import Analytics from "../pages/Analytics/Analytics";
import Billing from "../pages/Billing/Billing";
import Settings from "../pages/Settings/Settings";
import Calendar from "../pages/Calendar/Calendar";

import About from "../pages/About/About";

import Contact from "../pages/Contact/Contact";


function AppRoutes() {
  return (<BrowserRouter> <Routes>


    {/* PUBLIC LANDING PAGE */}

    <Route
      path="/"
      element={<Home />}
    />

    {/* AUTH PAGES */}

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/forgot-password"
      element={<ForgotPassword />}
    />

    <Route
      path="/reset-password"
      element={<ResetPassword />}
    />



    {/* HOME AFTER LOGIN */}

    <Route
      path="/home"
      element={
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      }
    />

    {/* DASHBOARD */}

    <Route
      path="/dashboard"
      element={
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      }
    />

    {/* INVESTORS */}

    <Route
      path="/investors"
      element={
        <DashboardLayout>
          <Investors />
        </DashboardLayout>
      }
    />

    {/* MEETINGS */}

    <Route
      path="/meetings"
      element={
        <DashboardLayout>
          <Meetings />
        </DashboardLayout>
      }
    />

    {/* TASKS */}

    <Route
      path="/tasks"
      element={
        <DashboardLayout>
          <Tasks />
        </DashboardLayout>
      }
    />

    {/* FOLLOW UPS */}

    <Route
      path="/followups"
      element={
        <DashboardLayout>
          <FollowUps />
        </DashboardLayout>
      }
    />

    {/* DOCUMENTS */}

    <Route
      path="/documents"
      element={
        <DashboardLayout>
          <Documents />
        </DashboardLayout>
      }
    />

    {/* PROFILE */}

    <Route
      path="/profile"
      element={
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      }
    />

    {/* TEAM */}

    <Route
      path="/team"
      element={
        <DashboardLayout>
          <Team />
        </DashboardLayout>
      }
    />

    {/* ANALYTICS */}

    <Route
      path="/analytics"
      element={
        <DashboardLayout>
          <Analytics />
        </DashboardLayout>
      }
    />

    {/* BILLING */}

    <Route
      path="/billing"
      element={
        <DashboardLayout>
          <Billing />
        </DashboardLayout>
      }
    />

    {/* SETTINGS */}

    <Route
      path="/settings"
      element={
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      }
    />

    {/* CALENDAR */}
    <Route
      path="/Calendar"
      element={
        <DashboardLayout>
          <Calendar />
        </DashboardLayout>
      }
    />


    {/* About */}

    <Route
      path="/about"
      element={
        <DashboardLayout>
          <About />
        </DashboardLayout>
      }
    />

    {/* Contact */}

    <Route
      path="/contact"
      element={
        <DashboardLayout>
          <Contact />
        </DashboardLayout>
      }
    />


    {/* FALLBACK */}

    <Route
      path="*"
      element={
        <Navigate
          to="/"
          replace
        />
      }
    />

  </Routes>
  </BrowserRouter>


  );
}

export default AppRoutes;
