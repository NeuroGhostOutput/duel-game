import React from 'react';

const Slider = ({ label, value, onChange, min = 1, max = 10 }) => {
  return (
    <div>
      <label>{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default Slider;