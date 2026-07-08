import { ExternalLink } from "lucide-react";
import surveyLinks from "../data/surveyLinks";

function SurveyBadge({ survey }) {
  const data = surveyLinks[survey];

  if (!data) return null;

  const colors = {
    sinodalitas: "bg-blue-100 text-blue-700 hover:bg-blue-200",

    fibb: "bg-green-100 text-green-700 hover:bg-green-200",
  };

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex
        items-center
        gap-1
        px-3
        py-2
        rounded-full
        text-sm
        font-medium
        transition-all
        duration-200
        hover:scale-105
        hover:shadow-md
        ${colors[survey] || "bg-slate-100 text-slate-700 hover:bg-slate-200"}
      `}
    >
      {data.title}

      <ExternalLink size={14} />
    </a>
  );
}

export default SurveyBadge;
