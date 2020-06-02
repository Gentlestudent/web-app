import { useState } from 'react';

export default (amount) => {
  const [currentStep, setCurrentStep] = useState(0);

  return {
    currentStep,
    doNext: () => {
      if (currentStep < amount - 1) setCurrentStep(currentStep + 1);
    },
    doPrevious: () => currentStep > 0 && setCurrentStep(currentStep - 1)
  };
};
