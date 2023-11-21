import React from "react";
import Select from "react-select";

interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  value: { value: string; label: string } | null;
  onChange: (value: { value: string; label: string } | null) => void;
  error?: string | null;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700  mb-2">{label}</label>
      <Select
        options={options}
        value={value}
        onChange={(selectedOption) => onChange(selectedOption)}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default SelectField;
