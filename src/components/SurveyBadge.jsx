import surveys from "../data/surveys";
import { ClipboardCheck } from "lucide-react";

function SurveyBadge({ survey }) {
  const colors = {
    sinodalitas: "bg-blue-100 text-blue-700 border-blue-200",

    fibb: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-2
        rounded-full
        border
        text-sm
        font-medium
        ${colors[survey] || "bg-gray-100 text-gray-700 border-gray-200"}
      `}
    >
      <ClipboardCheck size={15} />

      {surveys[survey]}
    </div>
  );
}

export default SurveyBadge;
