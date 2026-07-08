import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

import Layout from "../components/Layout";
import InputField from "../components/InputField";
import SectionCard from "../components/SectionCard";
import SurveyBadge from "../components/SurveyBadge";

import formTemplate from "../data/formTemplate";
import { createAssignment } from "../services/assignmentService";

function AssignmentForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    namaLingkungan: "",
    members: {},
  });

  function handleChange(field, value) {
    setFormData((prev) => ({
      ...prev,
      members: {
        ...prev.members,
        [field.key]: {
          key: field.key,
          label: field.label,
          nama: value,
          surveys: field.surveys,
          status: "belum",
          completedAt: null,
        },
      },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.namaLingkungan.trim()) {
      alert("Nama Lingkungan wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      await createAssignment(formData);

      alert("✅ Pendataan berhasil disimpan!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl mb-8">
          <h1 className="text-4xl font-bold">Pendataan Survei</h1>

          <p className="mt-2 text-blue-100">
            Isi nama Responden untuk setiap survei.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informasi */}
          <SectionCard title="Informasi Lingkungan">
            <InputField
              label="Nama Lingkungan"
              value={formData.namaLingkungan}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  namaLingkungan: e.target.value,
                }))
              }
            />
          </SectionCard>

          {/* Sections */}
          {formTemplate.map((section) => (
            <SectionCard key={section.title} title={section.title}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.fields.map((field) => (
                  <div
                    key={field.key}
                    className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        hover:shadow-md
        transition
        p-5
      "
                  >
                    <InputField
                      label={field.label}
                      value={formData.members[field.key]?.nama || ""}
                      onChange={(e) => handleChange(field, e.target.value)}
                    />

                    <div className="border-t pt-4">
                      <p className="text-sm font-semibold text-slate-500 mb-3">
                        Survei yang ditugaskan
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {field.surveys.map((survey) => (
                          <SurveyBadge key={survey} survey={survey} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          ))}

          {/* Submit */}

          <div className="sticky bottom-5">
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-4
                rounded-2xl
                shadow-xl
                text-lg
                font-semibold
                flex
                justify-center
                items-center
                gap-3
                disabled:bg-slate-400
              "
            >
              <Save size={22} />

              {loading ? "Menyimpan..." : "Simpan Pendataan"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default AssignmentForm;
