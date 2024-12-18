import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const VerticalStepper = ({date}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Order Confirmed', 'Order Processed', 'Order Shipped', 'Order Delivered'];
  
  
  const deliveryDate = new Date(date);
  // console.log("deliveryDate",deliveryDate);

  useEffect(() => {
    const currentDate = new Date();
    // console.log(currentDate);
    
    const daysDifference = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60 * 24));
    // console.log("daysDifference",daysDifference);

    const updatedStep = Math.abs(Math.min(Math.max(0, -daysDifference), steps.length )-4);
    // console.log("updatedStep",updatedStep);
    
    setActiveStep(updatedStep);
  }, [deliveryDate, steps.length]);

  return (
    <div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                style: {
                  color: index <= activeStep ? '#ee5435' : 'grey',
                },
              }}
              style={{
                color: index <= activeStep ? '#ee5435' : 'black',
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
