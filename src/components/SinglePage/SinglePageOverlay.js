import React from "react";

export default function SinglePageOverlay({ onClick, wrapperClass, children }) {
  return (
    <div
      className={`${wrapperClass ? wrapperClass : ""} invoice-overlay-wrapper`}
    >
      {children}
      <div className="invoice-overlay" onClick={onClick} />
    </div>
  );
}
