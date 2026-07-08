import { Link } from "react-router-dom";
import { Users, Eye, CalendarDays } from "lucide-react";
import formTemplate from "../data/formTemplate";

function AssignmentCard({ assignment }) {
  const members = assignment.members || {};

  // Total roles from formTemplate
  const totalMembers = formTemplate.reduce(
    (count, section) => count + section.fields.length,
    0,
  );

  // Count completed
  const completedMembers = Object.values(members).filter(
    (member) => member.status === "selesai",
  ).length;

  const pendingMembers = totalMembers - completedMembers;

  const progress =
    totalMembers === 0
      ? 0
      : Math.round((completedMembers / totalMembers) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-slate-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">
            {assignment.namaLingkungan}
          </h2>

          <div className="flex flex-wrap items-center gap-6 mt-4 text-slate-500">
            <div className="flex items-center gap-2">
              <Users size={18} />
              {totalMembers} Responden
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              Survei Kevikepan Surakarta
            </div>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium text-slate-600">Progress</span>

              <span className="font-semibold text-green-600">
                {completedMembers} / {totalMembers} Selesai
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs mt-2 text-slate-500">
              <span>🟢 {completedMembers} Selesai</span>
              <span>🟡 {pendingMembers} Belum</span>
            </div>
          </div>
        </div>

        <Link to={`/responses/${assignment.id}`}>
          <button className="ml-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <Eye size={18} />
            Lihat
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AssignmentCard;
