import { useState, useEffect } from 'react';

export default function useSteps(amount) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [steppedBack, setSteppedBack] = useState(false);

  useEffect(() => {
    setIsFinalStep(currentStep === amount - 1);
  }, [currentStep]);

  return {
    currentStep,
    steppedBack,
    isFinalStep,
    stepForward: () => currentStep < amount - 1 && setCurrentStep(currentStep + 1),
    stepBack: () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setSteppedBack(true);
      }
    }
  };
}
