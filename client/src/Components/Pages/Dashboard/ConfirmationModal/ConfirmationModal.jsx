// ConfirmationModal.js
import React from "react";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ message, onConfirm }) => {
  return (
    <div className="confirmation-modal">
      <div className="modal-content">
        <p>{message}</p>
        <div className="button-container">
          <button onClick={onConfirm}>I Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
