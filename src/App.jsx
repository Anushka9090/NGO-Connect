import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import NGOs from "./pages/NGOs";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Dashboard from "./pages/Dashboard";
import MyRegistrations from "./pages/MyRegistrations";
import Certificates from "./pages/Certificates";
import VerifyCertificate from "./pages/VerifyCertificate";

import CoordinatorDashboard from "./pages/CoordinatorDashboard";
import CoordinatorEvents from "./pages/CoordinatorEvents";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">

        <Navbar />

        <main className="flex-1">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ngos" element={<NGOs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-registrations"
              element={
                <ProtectedRoute>
                  <MyRegistrations />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates"
              element={
                <RoleProtectedRoute allowedRoles={["volunteer"]}>
                  <Certificates />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/coordinator/dashboard"
              element={
                <RoleProtectedRoute
                  allowedRoles={["coordinator", "admin"]}
                >
                  <CoordinatorDashboard />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/coordinator/events"
              element={
                <RoleProtectedRoute
                  allowedRoles={["coordinator", "admin"]}
                >
                  <CoordinatorEvents />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/coordinator/events/:eventId"
              element={
                <RoleProtectedRoute
                  allowedRoles={["coordinator", "admin"]}
                >
                  <CoordinatorEvents />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/coordinator/events/create"
              element={
                <RoleProtectedRoute
                  allowedRoles={["coordinator", "admin"]}
                >
                  <CreateEvent />
                </RoleProtectedRoute>
              }
            />

            <Route
  path="/verify-certificate"
  element={<VerifyCertificate />}
/>

            <Route
              path="*"
              element={
                <div className="mx-auto max-w-6xl px-6 py-20 text-center">

                  <h1 className="text-4xl font-bold text-emerald-950">
                    Page Not Found
                  </h1>

                  <p className="mt-3 text-slate-500">
                    The page you are looking for does not exist.
                  </p>

                  <a
                    href="/"
                    className="mt-6 inline-block rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                  >
                    Go Home
                  </a>

                </div>
              }
            />

          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;