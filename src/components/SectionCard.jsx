function SectionCard({ title, children }) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

      <div className="h-px bg-slate-200 my-5" />

      {children}
    </section>
  );
}

export default SectionCard;
