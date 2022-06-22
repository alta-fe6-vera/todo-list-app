import React from "react";

function Input({ type, placeholder, value, onChange, disabled }) {
  return (
    <input
      className="bg-[#E5FFD9] rounded-md text-black p-2 border focus:outline-none focus:border-[#29660C] focus-ring-1 focus:ring-[#29660C]"
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      defaultValue={value}
    />
  );
}

export { Input };
