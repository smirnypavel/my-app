import React, { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "../../styles/components/Modal/Modal.module.css";
import { MdClear } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) {
    return null;
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div
          className="modal"
          onClick={handleBackdropClick}>
          <div className="modal-wrapper">
            <div className="modal-content">
              {children}
              <button
                className="modal-close"
                onClick={onClose}>
                <MdClear />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
