import React from "react";
import { PropertiesFormStepProps } from ".";
import { Button, Form, Upload } from "antd";
import Image from "next/image";

function Media({
  currentStep,
  setCurrentStep,
  finalValues,
  setFinalValues,
}: PropertiesFormStepProps) {
  const [tempFiles, setTempFiles] = React.useState<any[]>([]);
  const onFinish = () => {
    setFinalValues({
      ...finalValues,
      media: {
        newlyUploadedFiles: tempFiles,
        images: finalValues.media.images,
      },
    });
    setCurrentStep(currentStep + 1);
  };
  return (
    <Form
      layout="vertical"
      initialValues={finalValues.media}
      onFinish={onFinish}
    >
      <div className="flex flex-wrap gap-5 mb-5">
        {finalValues.media.images.map((image: string, index: any) => (
          <div
            key={index}
            className="flex flex-col gap-1 border border-dashed border-gray-400 p-2 rounded justify-center items-start"
          >
            <Image
              src={image}
              alt=""
              className="object-cover rounded"
              width={40}
              height={40}
              placeholder="blur"
            />
            <span className="text-red-500 underline cursor-pointer">
              delete
            </span>
          </div>
        ))}
      </div>
      <Upload
        listType="picture-card"
        multiple
        beforeUpload={(file: any) => {
          setTempFiles((prev) => [...prev, file]);
          return false;
        }}
      >
        Upload
      </Upload>

      <div className="flex justify-end gap-5">
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

export default Media;
