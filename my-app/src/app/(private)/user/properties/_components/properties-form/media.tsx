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

  const deletePreviousImages = (image: string) => {
    let tempMedia = finalValues.media;
    tempMedia.images = tempMedia.images.filter((img: string) => img !== image);
    setFinalValues({
      ...finalValues,
      media: {
        newlyUploadedFiles: tempFiles,
        images: tempMedia.images,
      },
    });
  };

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
              width={150}
              height={110}
            />
            <div className="flex gap-1 text-red-500 cursor-pointer">
              <i className="ri-delete-bin-6-line"></i>
              <span
                className="underline"
                onClick={() => {
                  deletePreviousImages(image);
                }}
              >
                delete
              </span>
            </div>
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
