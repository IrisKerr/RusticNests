import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button } from "antd";

function Contact({ currentStep, setCurrentStep }: PropertiesFormStepProps) {
  return (
    <div>
      <span>Contact</span>
      <div className="flex justify-end gap-5">
        <Button type="default" onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Contact;
