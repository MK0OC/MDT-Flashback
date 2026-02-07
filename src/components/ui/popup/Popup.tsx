'use client';

import { useEffect } from "react";
import "./Popup.scss";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Popup = ({ isOpen, onClose, title, className, children }: PopupProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-content`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          {title && <h2>{title}</h2>}
          <button className="popup-close" onClick={onClose}>&times;</button>
        </div>
        <div className={`popup-body ${className ?? ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
