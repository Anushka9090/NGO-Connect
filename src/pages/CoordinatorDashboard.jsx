import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function CoordinatorDashboard() {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          throw new Error("Please login again.");
        }

        const eventsResponse = await fetch(
          `${API_URL}/events/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const eventsData = await eventsResponse.json();

        if (!eventsResponse.ok) {
          throw new Error(
            eventsData.message || "Failed to load events"
          );
        }

        const eventList = eventsData.events || [];

        setEvents(eventList);

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        for (const event of eventList) {
          const response = await fetch(
            `${API_URL}/registrations/event/${event._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();

          if (response.ok) {
            for (const registration of data.registrations || []) {
              const status =
                registration.status?.toLowerCase();

              if (status === "pending") {
                pending++;
              }

              if (status === "approved") {
                approved++;
              }

              if (status === "rejected") {
                rejected++;
              }
            }
          }
        }

        setStats({
          pending,
          approved,
          rejected,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4faf7]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-700" />

            <p className="mt-5 text-sm font-medium text-slate-500">
              Loading coordinator dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4faf7]">

      {/* Hero Section */}
      <section className="border-b border-emerald-900/10 bg-gradient-to-br from-[#effbf5] via-white to-[#e8f8f1]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">

            <div>
              <div className="mb-5 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                Coordinator Dashboard
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
                Manage your events
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Create events, manage volunteer registrations,
                and coordinate your volunteering activities.
              </p>
            </div>

            <Link
              to="/coordinator/events/create"
              className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-lg"
            >
              <span className="mr-2 text-lg">+</span>
              Create Event
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Overview */}
        <section>

          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Overview
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-emerald-950">
              Your activity
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* My Events */}
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(6,45,36,0.08)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  My Events
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  📅
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold text-emerald-950">
                {events.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Events created by you
              </p>
            </div>

            {/* Pending */}
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(6,45,36,0.08)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Pending
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-lg">
                  ⏳
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold text-amber-700">
                {stats.pending}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Awaiting your decision
              </p>
            </div>

            {/* Approved */}
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(6,45,36,0.08)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Approved
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  ✓
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold text-emerald-700">
                {stats.approved}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Approved volunteers
              </p>
            </div>

            {/* Rejected */}
            <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(6,45,36,0.08)]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Rejected
                </p>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-lg">
                  ✕
                </div>
              </div>

              <p className="mt-4 text-4xl font-bold text-red-600">
                {stats.rejected}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Rejected registrations
              </p>
            </div>

          </div>
        </section>

        {/* My Events */}
        <section className="mt-12">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Event management
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-emerald-950">
                My Events
              </h2>

              <p className="mt-2 text-slate-600">
                Manage the events you have created.
              </p>
            </div>

            <Link
              to="/coordinator/events/create"
              className="w-fit rounded-full bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              + Create another event
            </Link>

          </div>

          {events.length === 0 ? (

            <div className="mt-7 rounded-3xl border border-dashed border-emerald-900/20 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                📅
              </div>

              <h3 className="mt-5 text-xl font-bold text-emerald-950">
                No events yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Create your first volunteering event and
                start connecting with volunteers.
              </p>

              <Link
                to="/coordinator/events/create"
                className="mt-6 inline-flex rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Create Your First Event
              </Link>

            </div>

          ) : (

            <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {events.map((event) => (

                <div
                  key={event._id}
                  className="group flex flex-col rounded-3xl border border-emerald-900/10 bg-white p-6 shadow-[0_8px_30px_rgba(6,45,36,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(6,45,36,0.09)]"
                >

                  {/* Category */}
                  {event.category && (
                    <div>
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                        {event.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mt-4 text-xl font-bold leading-snug text-emerald-950">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {event.description}
                  </p>

                  {/* Details */}
                  <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

                    {/* Date */}
                    <div className="flex items-start gap-3">

                      <span className="text-base">
                        📅
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Date
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {event.date
                            ? new Date(
                                event.date
                              ).toLocaleDateString()
                            : "Date not available"}
                        </p>
                      </div>

                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-3">

                      <span className="text-base">
                        📍
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Location
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {event.location ||
                            "Location not available"}
                        </p>
                      </div>

                    </div>

                    {/* Capacity */}
                    <div className="flex items-start gap-3">

                      <span className="text-base">
                        👥
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Volunteer capacity
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {event.capacity || 0} volunteers
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Manage Event */}
                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <Link
                      to={`/coordinator/events/${event._id}`}
                      className="flex w-full items-center justify-center rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 hover:shadow-md"
                    >
                      Manage Event
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* Quick Access */}
        <section className="mt-12 rounded-3xl bg-emerald-950 p-7 text-white shadow-[0_15px_45px_rgba(6,45,36,0.15)] sm:p-9">

          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Quick access
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Coordinator tools
          </h2>

          <p className="mt-2 max-w-2xl text-emerald-100">
            Quickly create and manage your volunteering
            events.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            {/* Create Event */}
            <Link
              to="/coordinator/events/create"
              className="rounded-2xl bg-white p-6 text-emerald-950 transition hover:-translate-y-1 hover:bg-emerald-50"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                +
              </div>

              <p className="mt-5 text-lg font-bold">
                Create Event
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Create a new volunteering opportunity for
                volunteers to discover and register.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                Create an event →
              </span>

            </Link>

            {/* Manage Events */}
            <Link
              to="/coordinator/events"
              className="rounded-2xl bg-white p-6 text-emerald-950 transition hover:-translate-y-1 hover:bg-emerald-50"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                📋
              </div>

              <p className="mt-5 text-lg font-bold">
                Manage My Events
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                View your events, manage registrations, and
                update event details.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-emerald-700">
                Manage events →
              </span>

            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}

export default CoordinatorDashboard;