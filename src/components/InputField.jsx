function InputField({ label, value, onChange, ...props }) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-slate-700 mb-2">{label}</label>

      <input
        value={value}
        onChange={onChange}
        placeholder={`Nama ${label.toLowerCase()}`}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          transition
          focus:outline-none
          focus:ring-4
          focus:ring-blue-200
          focus:border-blue-500
        "
        {...props}
      />
    </div>
  );
}

export default InputField;
