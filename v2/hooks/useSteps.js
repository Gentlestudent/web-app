import { useState } from 'react';

export default (initialValue) => {
  const [steps, setSteps] = useState(initialValue);
  const [currentStep, setCurrentStep] = useState(0);

  return {
    steps,
    setSteps,
    currentStep: steps[currentStep],
    nextStep: (e) => {
      e.preventDefault();
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    },
    previousStep: () => currentStep > 0 && setCurrentStep(currentStep - 1)
  };
};
