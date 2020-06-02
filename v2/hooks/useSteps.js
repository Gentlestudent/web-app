import { useState, useEffect } from 'react';

export default (initialValue) => {
  const [values, setValues] = useState([]);
  const [steps, setSteps] = useState(initialValue);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentStepValues, setCurrentStepValues] = useState([]);

  useEffect(() => {
    setValues([...currentStepValues]);
  }, currentStepValues);

  return {
    steps,
    setSteps,
    currentStepValues,
    setCurrentStepValues,
    values,
    currentStep: steps[currentStep],
    nextStep: (e) => {
      e.preventDefault();
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    },
    previousStep: () => currentStep > 0 && setCurrentStep(currentStep - 1)
  };
};
