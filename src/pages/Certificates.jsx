import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api";

function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/certificates/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load certificates"
          );
        }

        setCertificates(data.certificates || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, [token]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <p>Loading certificates...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Styles */}
      <style>
        {`
          @media print {
            body {
              background: white !important;
            }

            nav,
            footer,
            .no-print {
              display: none !important;
            }

            .certificate-page {
              min-height: auto !important;
              background: white !important;
              padding: 0 !important;
            }

            .certificate-container {
              max-width: 100% !important;
              padding: 0 !important;
            }

            .certificate-card {
              display: none !important;
              box-shadow: none !important;
              margin: 0 !important;
              width: 100% !important;
              border-width: 4px !important;
            }

            .certificate-card.printing {
              display: block !important;
            }

            @page {
              size: A4 landscape;
              margin: 10mm;
            }
          }
        `}
      </style>

      <div className="certificate-page min-h-screen bg-gray-50 px-4 py-12">
        <div className="certificate-container mx-auto max-w-6xl">

          {/* Page Header */}
          <div className="no-print mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Certificates
            </h1>

            <p className="mt-2 text-gray-600">
              Certificates earned through your participation in
              NGO Connect events.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="no-print rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* No Certificates */}
          {!error && certificates.length === 0 && (
            <div className="no-print rounded-xl bg-white p-10 text-center shadow-sm">
              <div className="text-6xl">🎓</div>

              <h2 className="mt-5 text-xl font-semibold text-gray-900">
                No Certificates Yet
              </h2>

              <p className="mt-2 text-gray-500">
                Your certificates will appear here after you
                participate in an event and your attendance is
                marked present.
              </p>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="space-y-8">

              {certificates.map((certificate) => (
                <div key={certificate._id}>

                  {/* Certificate */}
                  <div
                    className="certificate-card overflow-hidden rounded-2xl border-4 border-emerald-700 bg-white shadow-lg"
                  >

                    {/* Certificate Header */}
                    <div className="border-b border-emerald-100 bg-emerald-50 px-8 py-6 text-center">
                      <div className="text-4xl">
                        ❤
                      </div>

                      <h2 className="mt-2 text-3xl font-bold tracking-wide text-emerald-900">
                        NGO CONNECT
                      </h2>

                      <p className="mt-1 text-sm uppercase tracking-[0.25em] text-emerald-700">
                        Connect • Volunteer • Impact
                      </p>
                    </div>

                    {/* Certificate Body */}
                    <div className="px-6 py-10 text-center sm:px-12">

                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                        Certificate of Participation
                      </p>

                      <h3 className="mt-6 text-2xl font-semibold text-gray-700">
                        This certificate is proudly presented to
                      </h3>

                      {/* Volunteer Name */}
                      <div className="mx-auto mt-5 max-w-2xl border-b-2 border-emerald-600 pb-3">
                        <p className="text-3xl font-bold text-emerald-800 sm:text-4xl">
                          {certificate.volunteer?.name ||
                            "Volunteer"}
                        </p>
                      </div>

                      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        In recognition of valuable participation
                        and contribution to the NGO Connect
                        community through the following event:
                      </p>

                      {/* Event Name */}
                      <h4 className="mt-6 text-2xl font-bold text-gray-900">
                        {certificate.event?.title ||
                          "NGO Event"}
                      </h4>

                      {/* Event Details */}
                      <div className="mx-auto mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">

                        {certificate.event?.date && (
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                              Event Date
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                              {new Date(
                                certificate.event.date
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        {certificate.event?.location && (
                          <div className="rounded-lg bg-gray-50 p-4">
                            <p className="text-xs uppercase tracking-wider text-gray-500">
                              Location
                            </p>

                            <p className="mt-1 font-semibold text-gray-800">
                              {certificate.event.location}
                            </p>
                          </div>
                        )}

                      </div>

                      {/* Bottom Details */}
                      <div className="mt-10 grid gap-6 border-t pt-6 text-sm sm:grid-cols-2">

                        <div>
                          <p className="text-gray-500">
                            Certificate ID
                          </p>

                          <p className="mt-1 break-all font-mono font-semibold text-gray-800">
                            {certificate.certificateId}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Issued On
                          </p>

                          <p className="mt-1 font-semibold text-gray-800">
                            {new Date(
                              certificate.issuedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                      </div>

                      {/* Signature Area */}
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">

                        <div>
                          <div className="mx-auto max-w-xs border-t border-gray-400 pt-2">
                            <p className="text-sm font-medium text-gray-700">
                              NGO Connect
                            </p>

                            <p className="text-xs text-gray-500">
                              Organization
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="mx-auto max-w-xs border-t border-gray-400 pt-2">
                            <p className="text-sm font-medium text-gray-700">
                              Authorized Coordinator
                            </p>

                            <p className="text-xs text-gray-500">
                              Certificate Issuer
                            </p>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Certificate Footer */}
                    <div className="bg-emerald-700 px-6 py-3 text-center text-sm text-white">
                      Thank you for making a difference through
                      volunteering.
                    </div>

                  </div>

                  {/* Print / Download Button */}
                  <div className="no-print mt-4 text-center">
                    <button
                      onClick={() => {
                        const allCertificates =
                          document.querySelectorAll(
                            ".certificate-card"
                          );

                        allCertificates.forEach((card) => {
                          card.classList.remove("printing");
                        });

                        const currentCertificate =
                          document.querySelectorAll(
                            ".certificate-card"
                          )[certificates.indexOf(certificate)];

                        currentCertificate.classList.add(
                          "printing"
                        );

                        setTimeout(() => {
                          window.print();

                          setTimeout(() => {
                            currentCertificate.classList.remove(
                              "printing"
                            );
                          }, 500);
                        }, 100);
                      }}
                      className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                    >
                      🖨️ Print / Download Certificate
                    </button>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Certificates;