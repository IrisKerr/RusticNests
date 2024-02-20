import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, InputNumber, Select, Space } from "antd";
import { furnishingTypes } from "@/constants";

function Amenities({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const onFinish = (values: any) => {
    setFinalValues({ ...finalValues, amenities: values });
    setCurrentStep(currentStep + 1);
  };
  return (
    <Form
      layout="vertical"
      initialValues={finalValues.amenities}
      onFinish={onFinish}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          name="bedrooms"
          label="Bedrooms"
          rules={[
            { required: true, message: "Please enter the number of bedrooms!" },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="bathrooms"
          label="Bathrooms"
          rules={[
            {
              required: true,
              message: "Please enter the number of bathrooms!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="balconies"
          label="Balconies"
          rules={[
            {
              required: true,
              message: "Please enter the number of balconies!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>
        <Form.Item
          name="furnishing"
          label="Furnishing"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select options={furnishingTypes} />
        </Form.Item>
        <Form.Item
          name="floors"
          label="Floors"
          rules={[
            {
              required: true,
              message: "Please enter the number of floors!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="1" />
        </Form.Item>

        <Form.Item
          name="area"
          label="Area"
          rules={[
            {
              required: true,
              message: "Please enter the area of the property!",
            },
          ]}
        >
          <Space>
            <InputNumber className="w-full" placeholder="50" />
            <span>m²</span>
          </Space>
        </Form.Item>
        <Form.Item
          name="land"
          label="Land"
          rules={[
            {
              required: true,
              message: "Please enter the superficy of land!",
            },
          ]}
        >
          <Space>
            <InputNumber className="w-full" placeholder="1" />
            <span>ha</span>
          </Space>
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

export default Amenities;
