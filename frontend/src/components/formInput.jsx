const FormInput = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default FormInput;