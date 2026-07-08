import { useEffect } from "react";
import surveyLinks from "../data/surveyLinks";

function SurveyQRModal({ open, onClose }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  function copy(url) {
    navigator.clipboard.writeText(url);
    alert("Link berhasil disalin.");
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">QR Code Survei</h2>
              <p className="text-slate-500 text-sm mt-1">
                Scan QR Code atau gunakan link di bawah.
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-2xl text-slate-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {Object.values(surveyLinks).map((survey) => (
            <div
              key={survey.title}
              className="border rounded-xl p-5 text-center"
            >
              <h3 className="font-bold text-lg mb-4">{survey.title}</h3>

              <img
                src={survey.qr}
                alt={survey.title}
                className="w-48 h-48 object-contain mx-auto mb-4"
              />

              <p className="text-xs break-all text-slate-500 mb-4">
                {survey.url}
              </p>

              <div className="flex justify-center gap-2">
                <button
                  onClick={() => copy(survey.url)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Salin
                </button>

                <a
                  href={survey.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg"
                >
                  Buka
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyQRModal;
