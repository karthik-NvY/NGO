// ConfirmationModal.js
import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ message, onConfirm, onClose }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
      <button className="close-btn" onClick={onClose}>×</button>
        <p>{message}</p>
        <div className="iconfirm-container">
          <button onClick={onConfirm}>I Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
