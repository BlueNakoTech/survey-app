import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, ClipboardCheck } from "lucide-react";
import InputField from "../components/InputField";
import Layout from "../components/Layout";
import SurveyBadge from "../components/SurveyBadge";
import formTemplate from "../data/formTemplate";

import {
  getAssignment,
  updateMemberName,
  updateAssignmentMembers,
} from "../services/assignmentService";

function handleNameChange(memberKey, value) {
  setAssignment((prev) => ({
    ...prev,
    members: {
      ...prev.members,
      [memberKey]: {
        ...prev.members[memberKey],
        nama: value,
      },
    },
  }));
}

async function saveName(member) {
  try {
    setSaving(true);

    await updateMemberName(assignment.id, member.key, member.nama);
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan nama.");
  } finally {
    setSaving(false);
  }
}

function AssignmentDetail() {
  const { id } = useParams();

  const [assignment, setAssignment] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAssignment();
  }, []);

  async function loadAssignment() {
    try {
      const data = await getAssignment(id);
      setAssignment(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleNameChange(memberKey, value) {
    const existing = assignment.members?.[memberKey] || {
      key: memberKey,
      label:
        formTemplate
          .flatMap((section) => section.fields)
          .find((field) => field.key === memberKey)?.label || "",
      nama: "",
      surveys:
        formTemplate
          .flatMap((section) => section.fields)
          .find((field) => field.key === memberKey)?.surveys || [],
      status: "belum",
      completedAt: null,
    };

    setAssignment((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        [memberKey]: {
          ...existing,
          nama: value,
        },
      },
    }));
  }

  async function toggleStatus(member) {
    const updatedMember = {
      ...member,
      status: member.status === "selesai" ? "belum" : "selesai",
    };

    setAssignment((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        [member.key]: updatedMember,
      },
    }));

    await updateMemberStatus(assignment.id, updatedMember);
  }

  if (!assignment) {
    return (
      <Layout>
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">Memuat data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Kembali ke Dashboard
          </Link>

          <h1 className="text-4xl font-bold">{assignment.namaLingkungan}</h1>

          <p className="mt-2 text-blue-100">Detail Responden Survei</p>
        </div>

        {formTemplate.map((section) => (
          <div key={section.title} className="mb-10">
            <h2 className="text-2xl font-bold mb-5">{section.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => {
                const member = assignment.members?.[field.key] || {
                  key: field.key,
                  label: field.label,
                  nama: "",
                  surveys: field.surveys,
                  status: "belum",
                  completedAt: null,
                };

                return (
                  <div
                    key={field.key}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">
                          {member.label}
                        </h3>

                        <div className="mt-4">
                          <InputField
                            label="Responden"
                            value={member.nama || ""}
                            onChange={(e) =>
                              handleNameChange(member.key, e.target.value)
                            }
                          />

                          <button
                            onClick={async () => {
                              await updateAssignmentMembers(
                                assignment.id,
                                assignment.members,
                              );
                              alert("Perubahan berhasil disimpan.");
                            }}
                            className="
      mt-2
      bg-slate-700
      hover:bg-slate-800
      text-white
      px-4
      py-2
      rounded-lg
      text-sm
    "
                          >
                            💾 Update
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleStatus(member)}
                        className={`px-3 py-2 rounded-full font-semibold transition ${
                          member.status === "selesai"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        {member.status === "selesai"
                          ? "🟢 Selesai"
                          : "🟡 Belum"}
                      </button>
                    </div>

                    <div className="border-t mt-6 pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <ClipboardCheck size={18} />

                        <span className="font-semibold text-slate-700">
                          Survei
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {member.surveys.map((survey) => (
                          <SurveyBadge key={survey} survey={survey} />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default AssignmentDetail;
