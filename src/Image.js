import React from 'react';

const Image = ({ url }) => {
  return (
    <div className="image-container">
      <img src={url} alt="not found" />
    </div>
  );
};

export default Image;