import React from 'react';
import './Modal.css'; // Make sure to create a Modal.css for styling
import AuthForm from './AuthForm'; // Import your AuthForm

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <AuthForm />
      </div>
    </div>
  );
};

export default Modal;
