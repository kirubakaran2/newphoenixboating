import React from 'react';
import { FormField as FormFieldType } from './types';

interface FormFieldProps extends FormFieldType {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  options = [],
  value,
  onChange,
}) => {
  const baseInputClasses = "w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  const renderField = () => {
    if (type === 'select') {
      return (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseInputClasses}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {renderField()}
    </div>
  );
};