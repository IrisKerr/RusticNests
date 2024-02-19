"use client";
import React from "react";
import { Steps } from "antd";
import Basic from "./basic";
import Location from "./location";
import Amenities from "./amenities";
import Media from "./media";
import Contact from "./contact";

export interface PropertiesFormStepProps {
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  finalValues: any;
  setfinalValues: () => void;
}

function PropertiesForm() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [finalValues, setfinalValues] = React.useState({
    basic: {},
    location: {},
    amenities: {},
    media: {},
    contact: {},
  });

  const commonPropsforSetps: any = {
    currentStep,
    setCurrentStep,
    finalValues,
    setfinalValues,
  };

  const steps = [
    { title: "Basic", content: <Basic {...commonPropsforSetps} /> },
    { title: "Location", content: <Location {...commonPropsforSetps} /> },
    { title: "Amenities", content: <Amenities {...commonPropsforSetps} /> },
    { title: "Media", content: <Media {...commonPropsforSetps} /> },
    { title: "Contact", content: <Contact {...commonPropsforSetps} /> },
  ];
  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className="mt-8">{steps[currentStep].content}</div>
    </div>
  );
}

export default PropertiesForm;
