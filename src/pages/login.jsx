import React from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { theme } from "../theme/theme";

const { Title } = Typography;

const Login = () => {
  const onFinish = async (values) => {
    console.log("Login Data:", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        fontFamily: theme.fontFamily,
      }}
    >
      <Card
        style={{
          width: 350,
          borderRadius: theme.buttonRadius,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title
          level={3}
          style={{ textAlign: "center", color: theme.primaryColor }}
        >
          Login
        </Title>

        <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
          {/* Phone Number */}
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter phone number" },
              { len: 10, message: "Phone number must be 10 digits" },
            ]}
          >
            <Input
              type="tel"
              maxLength={10}
              placeholder="Enter phone number"
              style={{
                borderRadius: theme.buttonRadius,
                borderColor: theme.inputBorderColor,
              }}
            />
          </Form.Item>

          {/* OTP */}
          <Form.Item
            name="otp"
            label="OTP"
            rules={[{ required: true, message: "Please enter OTP" }]}
          >
            <Input
              type="number"
              placeholder="Enter OTP"
              style={{
                borderRadius: theme.buttonRadius,
                borderColor: theme.inputBorderColor,
              }}
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: theme.secondaryColor,
                borderRadius: theme.buttonRadius,
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
