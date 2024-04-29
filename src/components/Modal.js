import React from "react";
import "./modal.css";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
        <button className="close-button"onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
