import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus, ClipboardList, QrCode, Search } from "lucide-react";

import Layout from "../components/Layout";
import AssignmentCard from "../components/AssignmentCard";
import SurveyQRModal from "../components/SurveyQRModal";

import lingkunganList from "../data/lingkunganList";

import {
  getAssignments,
  getDashboardSettings,
} from "../services/assignmentService";

function Dashboard() {
  const [assignments, setAssignments] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [search, setSearch] = useState("");

  const [settings, setSettings] = useState({
    title: "",
    note: "",
    deadline: "",
    showDeadline: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [assignmentData, settingData] = await Promise.all([
        getAssignments(),
        getDashboardSettings(),
      ]);

      setAssignments(assignmentData);
      setSettings(settingData);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.namaLingkungan.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-bold">Pendataan Survei Paroki Dalem</h1>

          <p className="mt-3 text-blue-100 text-lg">
            Pendataan ini bertujuan untuk mempermudah pengurus lingkungan di
            Paroki Dalem agar setiap pengurus dapat menentukan responden yang
            akan mengisi survei.
          </p>

          {settings.showDeadline && (
            <div className="mt-6 inline-flex items-center gap-3 bg-yellow-300 text-yellow-900 px-5 py-3 rounded-xl shadow-md">
              <span className="text-2xl">📅</span>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">
                  Batas Pengisian Survei
                </p>

                <p className="text-lg font-bold">{settings.deadline}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={() => setShowQR(true)}
              className="bg-white text-blue-600 px-5 py-3 rounded-xl shadow hover:bg-slate-100 flex items-center gap-2 transition"
            >
              <QrCode size={20} />
              Link Akses Survei
            </button>

            <Link to="/pendataan">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow hover:bg-slate-100 transition flex items-center gap-2">
                <Plus size={20} />
                Tambah Lingkungan
              </button>
            </Link>
          </div>
        </div>

        {/* Information */}
        {settings.note && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-bold text-blue-700 mb-3">
              {settings.title}
            </h2>

            <div className="whitespace-pre-line text-slate-700 leading-7">
              {settings.note}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              list="lingkungan-search"
              placeholder="Cari nama lingkungan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                bg-white
                rounded-2xl
                border
                border-slate-300
                py-3
                pl-12
                pr-4
                shadow-sm
                focus:outline-none
                focus:ring-4
                focus:ring-blue-200
                focus:border-blue-500
              "
            />

            <datalist id="lingkungan-search">
              {lingkunganList.map((nama) => (
                <option key={nama} value={nama} />
              ))}
            </datalist>
          </div>
        </div>

        {/* Assignment List */}
        <h2 className="text-2xl font-bold mb-5">Daftar Pendataan</h2>

        {filteredAssignments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ClipboardList size={70} className="mx-auto text-slate-300 mb-6" />

            <h3 className="text-2xl font-semibold">Belum ada pendataan</h3>

            <p className="text-slate-500 mt-3">
              Mulai dengan membuat pendataan pertama.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredAssignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </div>
        )}

        <SurveyQRModal open={showQR} onClose={() => setShowQR(false)} />
      </div>
    </Layout>
  );
}

export default Dashboard;
