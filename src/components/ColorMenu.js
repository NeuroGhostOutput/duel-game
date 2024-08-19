import React from 'react';

const ColorMenu = ({ onClose, onColorChange }) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      border: '1px solid black',
      borderRadius: '5px'
    }}>
      <h3>Choose a color</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {colors.map(color => (
          <div
            key={color}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
              cursor: 'pointer'
            }}
            onClick={() => {
              onColorChange(color);
              onClose();
            }}
          />
        ))}
      </div>
      <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
    </div>
  );
};

export default ColorMenu;