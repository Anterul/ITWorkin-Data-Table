import React from "react";
import "./LoadingPopup.scss";

interface PopupProps {
  isOpen: boolean;
}

const LoadingPopup: React.FC<PopupProps> = ({ isOpen }) => {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPopup;
