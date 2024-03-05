"use client";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

function QueryModal({ propertyId }: { propertyId: string }) {
  const [showQueryModal, setshowQueryModal] = React.useState(false);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <div className="mt-7">
      <Button type="primary" block onClick={() => setshowQueryModal(true)}>
        Send Query to the owner
      </Button>
      {showQueryModal && (
        <Modal
          open={showQueryModal}
          onCancel={() => setshowQueryModal(false)}
          title="Send a Query to the Owner"
          centered
          width={600}
          footer={null}
        >
          <Form
            layout="vertical"
            name="query-form"
            onFinish={() => setshowQueryModal(false)}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter your Name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="quoteAmount"
              label="Quote Amount"
              rules={[
                { required: true, message: "Please enter your quote amount" },
              ]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your Email" },
                {
                  type: "email",
                  message: "Please enter a valid Email address!",
                },
              ]}
            >
              <Input className="w-full" placeholder="Owner Email" />
            </Form.Item>
            <div className="flex justify-end gap-3">
              <Button
                htmlType="button"
                onClick={() => setshowQueryModal(false)}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary">
                Send
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default QueryModal;
