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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

function PropertiesForm({
  initialValues = {},
  isEdit = false,
}: {
  initialValues?: any;
  isEdit?: boolean;
}) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isLoading, setisLoading] = React.useState(false);

  const [finalValues, setFinalValues] = React.useState({
    basic: initialValues,
    location: initialValues,
    amenities: initialValues,
    media: {
      newlyUploadedFiles: [],
      images: initialValues.images || [],
    },
    contact: initialValues,
  });

  const commonPropsforSteps: any = {
    currentStep,
    setCurrentStep,
    finalValues,
    setFinalValues,
    isLoading,
    setisLoading,
  };

  const steps = [
    { title: "Basic", content: <Basic {...commonPropsforSteps} /> },
    { title: "Location", content: <Location {...commonPropsforSteps} /> },
    { title: "Amenities", content: <Amenities {...commonPropsforSteps} /> },
    { title: "Media", content: <Media {...commonPropsforSteps} /> },
    { title: "Contact", content: <Contact {...commonPropsforSteps} /> },
  ];

  return (
    <div>
      <Steps current={currentStep} items={steps} />
      <div className="mt-8">{steps[currentStep].content}</div>
    </div>
  );
}

export default PropertiesForm;
