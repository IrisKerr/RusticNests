"use client";
import React, { useEffect } from "react";
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
  setFinalValues: (arg: string) => void;
}

function PropertiesForm() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [finalValues, setFinalValues] = React.useState({
    basic: {},
    location: {},
    amenities: {},
    media: {
      newlyUploadedFiles: [],
      images: [],
    },
    contact: {},
  });

  const commonPropsforSetps: any = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
  };

  const steps = [
    { title: "Basic", content: <Basic {...commonPropsforSetps} /> },
    { title: "Location", content: <Location {...commonPropsforSetps} /> },
    { title: "Amenities", content: <Amenities {...commonPropsforSetps} /> },
    { title: "Media", content: <Media {...commonPropsforSetps} /> },
    { title: "Contact", content: <Contact {...commonPropsforSetps} /> },
  ];

  useEffect(() => {
    console.log(finalValues);
  }, [finalValues]);

  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className="mt-8">{steps[currentStep].content}</div>
    </div>
  );
}

export default PropertiesForm;
