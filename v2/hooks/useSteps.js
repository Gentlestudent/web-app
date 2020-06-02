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
    doNext: () => {
      if (currentStep < amount - 1) setCurrentStep(currentStep + 1);
    },
    doPrevious: () => currentStep > 0 && setCurrentStep(currentStep - 1)
  };
};
