import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isCoordinator =
    user?.role === "coordinator" || user?.role === "admin";

  const dashboardPath = isCoordinator
    ? "/coordinator/dashboard"
    : "/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white shadow-sm">
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>

          <div>
            <span className="block text-xl font-bold tracking-tight text-emerald-950">
              NGO Connect
            </span>

            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-700 sm:block">
              Connect • Volunteer • Impact
            </span>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="hidden items-center gap-1 md:flex">

          {/* Home */}
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
          >
            Home
          </Link>

          {/* Events - Volunteer Only */}
          {user?.role === "volunteer" && (
            <Link
              to="/events"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Events
            </Link>
          )}

          {/* Dashboard */}
          {user && (
            <Link
              to={dashboardPath}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Dashboard
            </Link>
          )}

          {/* Volunteer Navigation */}
          {user?.role === "volunteer" && (
            <>
              <Link
                to="/my-registrations"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                My Registrations
              </Link>

              {/* My Certificates */}
              <Link
                to="/certificates"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
              >
                My Certificates
              </Link>
            </>
          )}

          {/* Coordinator / Admin Navigation */}
          {isCoordinator && (
            <Link
              to="/coordinator/events"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              My Events
            </Link>
          )}

          {/* Profile */}
          {user && (
            <Link
              to="/profile"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Profile
            </Link>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {user ? (
            <>
              {/* User Information */}
              <div className="hidden items-center gap-3 lg:flex">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>

                  <p className="text-xs capitalize text-emerald-700">
                    {user.role}
                  </p>
                </div>

              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="hidden rounded-full px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800 sm:block"
              >
                Log in
              </Link>

              {/* Signup */}
              <Link
                to="/register"
                className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-md"
              >
                Join as Volunteer
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;