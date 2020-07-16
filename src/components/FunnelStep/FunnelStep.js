import React from "react";

import "./FunnelStep.css";

export default function FunnelStep({ id, activeStep, children }) {
  return (
    <span
      className={
        "billeroo-plan-funnel-header-step " +
        (id < activeStep ? "done" : id === activeStep ? "active" : "future")
      }
    >
      {children}
    </span>
  );
}
