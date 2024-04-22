import React from "react";
import "./Modal.css";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          <FaWindowClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
