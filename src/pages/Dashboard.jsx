import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, ClipboardList } from "lucide-react";
import { QrCode } from "lucide-react";
import SurveyQRModal from "../components/SurveyQRModal";
import Layout from "../components/Layout";
import AssignmentCard from "../components/AssignmentCard";
import { getAssignments } from "../services/assignmentService";

function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    loadAssignments();
  }, []);

  async function loadAssignments() {
    try {
      const data = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-bold">Pendataan Survei Paroki Dalem</h1>

          <p className="mt-3 text-blue-100 text-lg">
            Pendataan ini bertujuan untuk mempermudah pengurus lingkungan di
            Paroki Dalem, agar setiap pengurus dapat menentukan responden yang
            akan mengisi survei
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-yellow-300 text-yellow-900 px-5 py-3 rounded-xl shadow-md">
            <span className="text-2xl">📅</span>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide">
                Batas Pengisian Survei
              </p>

              <p className="text-lg font-bold">10 Juli 2026 | 23:59 WIB</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6 flex-wrap">
            <button
              onClick={() => setShowQR(true)}
              className="bg-white text-blue-600 px-5 py-3 rounded-xl shadow hover:bg-slate-100 flex items-center gap-2"
            >
              <QrCode size={20} />
              Link Akses Survei
            </button>

            <Link to="/pendataan">
              <button className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition">
                <div className="flex items-center gap-2">
                  <Plus size={20} />
                  Tambah Lingkungan
                </div>
              </button>
            </Link>
          </div>
        </div>

        {/* Assignment List */}

        <h2 className="text-2xl font-bold mb-5">Daftar Pendataan</h2>

        {assignments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ClipboardList size={70} className="mx-auto text-slate-300 mb-6" />

            <h3 className="text-2xl font-semibold">Belum ada pendataan</h3>

            <p className="text-slate-500 mt-3">
              Mulai dengan membuat pendataan pertama.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        )}
      </div>
      <SurveyQRModal open={showQR} onClose={() => setShowQR(false)} />
    </Layout>
  );
}

export default Dashboard;
