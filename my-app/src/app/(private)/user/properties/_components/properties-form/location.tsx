import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Select, Input, InputNumber } from "antd";
import { propertyCountries } from "@/constants";

function Location({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, location: values });
    setCurrentStep(currentStep + 1);
  };

  return (
    <Form
      layout="vertical"
      initialValues={finalValues.location}
      onFinish={onFinish}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="town"
          label="Town"
          rules={[{ required: true, message: "Please enter a Town!" }]}
        >
          <Input placeholder="Town" />
        </Form.Item>
        <Form.Item
          name="pincode"
          label="Pincode"
          rules={[{ required: true, message: "Please enter a Pincode!" }]}
        >
          <Input placeholder="Pincode" className="w-full" />
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: "Please enter a Country!" }]}
        >
          <Select options={propertyCountries} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Full Address"
          rules={[{ required: true, message: "Please enter an address!" }]}
          className="col-span-1 lg:col-span-3"
        >
          <Input.TextArea rows={4} placeholder="Full address" />
        </Form.Item>
      </div>
      <div className="flex justify-end gap-5 mt-7">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button htmlType="submit" type="primary">
          Next
        </Button>
      </div>
    </Form>
  );
}

export default Location;
