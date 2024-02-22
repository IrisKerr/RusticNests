import React, { useReducer, useState } from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, InputNumber, Select, message } from "antd";
import PhoneInput from "antd-phone-input";
import { UploadfilesToFirebaseAndReturnUrls } from "@/helpers/upload-media";
import { addProperty } from "@/actions/properties";
import { useRouter } from "next/navigation";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
}: PropertiesFormStepProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const tempFinalValues = { ...finalValues, contact: values };
      const tempMedia = tempFinalValues.media;
      tempMedia.images = await UploadfilesToFirebaseAndReturnUrls(
        tempMedia.newlyUploadedFiles
      );
      tempFinalValues.media = tempMedia;

      // Construire l'objet valuesAsPerDb en fusionnant les différentes parties de tempFinalValues
      const valuesAsPerDb = {
        ...tempFinalValues.basic,
        ...tempFinalValues.location,
        ...tempFinalValues.amenities,
        ...tempFinalValues.contact,
        images: tempFinalValues.media.images, // Assurez-vous que c'est le bon chemin pour accéder aux images
      };
      console.log(valuesAsPerDb);
      // Utiliser valuesAsPerDb comme argument pour addProperty
      const response = await addProperty(valuesAsPerDb);
      setIsLoading(false);
      message.success("Property added successfully");
      console.log("createdProp", response?.data);
      router.push("/user/properties");
    } catch (error) {
      console.error("An error occurred:", error);
      setIsLoading(false);
      message.error("There's been an issue. Please try again !");
    }
  };

  return (
    <Form
      layout="vertical"
      initialValues={finalValues.amenities}
      onFinish={onFinish}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="ownerName"
          label="Owner Name"
          rules={[{ required: true, message: "Please enter the Owner Name!" }]}
        >
          <Input className="w-full" placeholder="Owner Name" />
        </Form.Item>

        <Form.Item
          name="ownerEmail"
          label="Owner Email"
          rules={[
            { required: true, message: "Please enter the Owner Email!" },
            {
              type: "email",
              message: "Please enter a valid Email address!",
            },
          ]}
        >
          <Input className="w-full" placeholder="Owner Email" />
        </Form.Item>

        <Form.Item
          name="ownerPhoneNumber"
          label="Owner Phone Number"
          rules={[
            { required: true, message: "Please enter the Owner phone number!" },
          ]}
        >
          <Input className="w-full" placeholder="Owner Phone Number" />
        </Form.Item>

        <Form.Item
          name="showOwnerContact"
          label="Show Owner Contact"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false },
            ]}
          />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button type="default" onClick={() => setCurrentStep(currentStep - 1)}>
          Back
        </Button>
        <Button htmlType="submit" type="primary" loading={isLoading}>
          Save Property
        </Button>
      </div>
    </Form>
  );
}

export default Contact;
