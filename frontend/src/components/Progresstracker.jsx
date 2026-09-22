import React from "react";
function Progresstracker({ steps = [], currentStep = 1 }) {
  return (
    <div className="progress-tracker">

      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const completed =
          stepNumber < currentStep;

        const active =
          stepNumber === currentStep;

        return (
          <div
            className="progress-step"
            key={stepNumber}
          >

            <div
              className={`progress-circle ${
                completed
                  ? "completed"
                  : active
                  ? "active"
                  : ""
              }`}
            >
              {stepNumber}
            </div>

            <span
              className={
                active || completed
                  ? "progress-label active"
                  : "progress-label"
              }
            >
              {step}
            </span>

          </div>
        );
      })}

    </div>
  );
}

export default Progresstracker;