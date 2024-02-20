import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, Select } from "antd";
import PhoneInput from "antd-phone-input";
import { UploadfilesToFirebaseAndReturnUrls } from "@/helpers/upload-media";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
}: PropertiesFormStepProps) {
  const onFinish = async (values: any) => {
    try {
      const tempFinalValues = { ...finalValues, contact: values };
      const tempMedia = tempFinalValues.media;
      tempMedia.images = await UploadfilesToFirebaseAndReturnUrls(
        tempMedia.newlyUploadedFiles
      );
      tempFinalValues.media = tempMedia;
      console.log(tempFinalValues);
    } catch (error) {
      throw new Error();
    }
  };

  // validator from antd-phone-input
  const validator = ({ valid }: { valid: () => boolean }) => {
    // if (valid(true)) return Promise.resolve(); // strict validation
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
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
          rules={[{ validator }]}
        >
          <PhoneInput enableSearch />
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
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Contact;
