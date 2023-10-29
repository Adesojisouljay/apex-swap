import React, { useState, useEffect } from 'react';
import { isAccessTokenExpired } from '../../helpers/access-token'; 

const SessionExpiredModal = ({ isOpen, onClose, onRedirectToLogin }) => {
  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box">
          <p>Your session has expired.</p>
          <button onClick={onRedirectToLogin}>Go to Login</button>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default SessionExpiredModal;
