import React from "react";

const Toast = ({ text }) => {
  return (
    <div className="toast toast-end z-10">
      <div className="alert alert-info">
        <div>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
