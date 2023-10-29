import React from 'react';
import './spinner.scss';

const ButtonSpinner = ({ isLoading, onClick, children }) => {
  return (
    <button className={`button ${isLoading ? 'loading' : ''}`} onClick={onClick} disabled={isLoading}>
      {isLoading ? <div className="spinner"></div> : children}
    </button>
  );
};

export default ButtonSpinner;
