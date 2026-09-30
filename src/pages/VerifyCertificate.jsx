import { useState } from "react";

const API_URL = "http://localhost:5000/api";

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!certificateId.trim()) {
      setError("Please enter a certificate ID.");
      setCertificate(null);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCertificate(null);

      const response = await fetch(
        `${API_URL}/certificates/verify/${encodeURIComponent(
          certificateId.trim()
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Certificate could not be verified."
        );
      }

      setCertificate(data.certificate);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="text-center">
          <div className="text-5xl">🎓</div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Verify Certificate
          </h1>

          <p className="mt-2 text-gray-600">
            Enter a certificate ID to verify its authenticity.
          </p>
        </div>

        {/* Verification Form */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleVerify}>
            <label
              htmlFor="certificateId"
              className="block text-sm font-medium text-gray-700"
            >
              Certificate ID
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="certificateId"
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify Certificate"}
              </button>
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5 text-center">
            <div className="text-3xl">❌</div>

            <h2 className="mt-2 text-lg font-semibold text-red-800">
              Invalid Certificate
            </h2>

            <p className="mt-1 text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* Valid Certificate */}
        {certificate && (
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-emerald-600 bg-white shadow-lg">

            {/* Valid Header */}
            <div className="bg-emerald-700 px-6 py-5 text-center text-white">
              <div className="text-4xl">✓</div>

              <h2 className="mt-2 text-2xl font-bold">
                Certificate Verified
              </h2>

              <p className="mt-1 text-emerald-100">
                This certificate is valid and was issued by NGO Connect.
              </p>
            </div>

            {/* Certificate Details */}
            <div className="space-y-5 p-6 sm:p-8">

              <div>
                <p className="text-sm text-gray-500">
                  Volunteer Name
                </p>

                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {certificate.volunteer?.name || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Event
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {certificate.event?.title || "Not available"}
                </p>
              </div>

              {certificate.event?.description && (
                <div>
                  <p className="text-sm text-gray-500">
                    Event Description
                  </p>

                  <p className="mt-1 text-gray-700">
                    {certificate.event.description}
                  </p>
                </div>
              )}

              <div className="grid gap-5 border-t pt-5 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Event Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {certificate.event?.date
                      ? new Date(
                          certificate.event.date
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {certificate.event?.location ||
                      "Not available"}
                  </p>
                </div>

              </div>

              <div className="grid gap-5 border-t pt-5 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Certificate ID
                  </p>

                  <p className="mt-1 break-all font-mono font-semibold text-gray-800">
                    {certificate.certificateId}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Issued On
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    {certificate.issuedAt
                      ? new Date(
                          certificate.issuedAt
                        ).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default VerifyCertificate;