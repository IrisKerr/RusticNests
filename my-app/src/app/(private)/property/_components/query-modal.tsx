"use client";
import { sendQuery } from "@/actions/queries";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import React from "react";

function QueryModal({ propertyId }: { propertyId: string }) {
  const [showQueryModal, setshowQueryModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      setLoading(true);
      const response = await sendQuery({ ...values, propertyId });
      if (response.error) throw new Error(response.error.message);
      message.success(response?.message);
      setshowQueryModal(false);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
      setshowQueryModal(false);
    }
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
          <Form layout="vertical" name="query-form" onFinish={onFinish}>
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
                disabled={loading}
              >
                Cancel
              </Button>
              <Button htmlType="submit" type="primary" loading={loading}>
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
