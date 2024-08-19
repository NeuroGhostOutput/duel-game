import React, { forwardRef } from 'react';

const Canvas = forwardRef((props, ref) => {
  return (
    <canvas
      ref={ref}
      width={800}
      height={600}
      style={{ border: '1px solid black' }}
      {...props}
    />
  );
});

export default Canvas;