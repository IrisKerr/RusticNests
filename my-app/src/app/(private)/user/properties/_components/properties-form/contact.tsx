import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Input, Select } from "antd";
import PhoneInput from "antd-phone-input";
import FormItem from "antd/es/form/FormItem";

function Contact({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    const tempFinalValues = { ...finalValues, contact: values };
    console.log(tempFinalValues);
  };

  const validator = (_, { valid }) => {
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
          rules={[{ required: true, message: "Please enter the owner Name!" }]}
        >
          <Input className="w-full" placeholder="Owner Name" />
        </Form.Item>

        <Form.Item
          name="ownerEmail"
          label="Owner Email"
          rules={[
            { required: true, message: "Please enter the owner email!" },
            {
              type: "email",
              message: "Please enter a valid email address!",
            },
          ]}
        >
          <Input className="w-full" placeholder="Owner Email" />
        </Form.Item>
        <Form.Item
          name="ownerPhone"
          label="Owner Phone"
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
