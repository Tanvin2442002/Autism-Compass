import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const VerticalStepper = () => {
  const [activeStep, setActiveStep] = useState(0); // Start with the first step
  const steps = ['Order Confirmed', 'Order Processed', 'Order Shipped', 'Order Delivered'];

  useEffect(() => {
    // Increment the active step every 2 seconds (just for demonstration)
    const stepTimer = setTimeout(() => {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }, 2000);

    // Automatically reset the stepper after 4 days (in milliseconds)
    const resetTimer = setTimeout(() => {
      setActiveStep(0);
    }, 8000); // 4 days in milliseconds

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(resetTimer);
    };
  }, [activeStep, steps.length]);

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                style: {
                  color: index <= activeStep ? '#ee5435' : 'grey', // Change the icon color for completed steps
                },
              }}
              style={{
                color: index <= activeStep ? '#ee5435' : 'black', // Change the text color for completed steps
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default VerticalStepper;
