import React from "react";
import { Button, Col, Form, Input, InputNumber, Row } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

const App: React.FC = () => (
  <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
    <Col span={6}>
      <Form
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "first_name"]}
          label="First Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "last_name"]}
          label="Last Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email"]}
          label="Email"
          rules={[{ type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "user_name"]}
          label="User Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);

export default App;
