import { useState, useEffect } from 'react';

export default (amount) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinalStep, setIsFinalStep] = useState(false);

  useEffect(() => {
    setIsFinalStep(currentStep === amount - 1);
  }, [currentStep]);

  return {
    currentStep,
    isFinalStep,
    stepTo: (stepNumber) => setCurrentStep(stepNumber),
    stepForward: () => currentStep < amount - 1 && setCurrentStep(currentStep + 1),
    stepBack: () => currentStep > 0 && setCurrentStep(currentStep - 1)
  };
};
