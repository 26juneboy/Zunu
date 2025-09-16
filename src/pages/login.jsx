import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { theme } from "../theme/theme";
import { sendOTP, validateOTP } from "../services/service";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    if (!otpSent) {
      // Send OTP
      try {
        const response = await sendOTP(values);
        if (response.responseStatus === "SUCCESS") {
          setOtpSent(true);
        } else {
          setOtpSent(false);
        }
      } catch (error) {
        message.error("Failed to send OTP", error);
      }
    } else {
      // Handle login with OTP
      const response = await validateOTP(values);
      if (response.responseStatus === "SUCCESS") {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/quotes");
      } else {
        navigate("/login");
      }
      setOtpSent(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: theme.fontFamily,
        minHeight: "100vh",
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
            name="phoneNumber"
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
            rules={[{ required: otpSent, message: "Please enter OTP" }]}
          >
            <Input
              type="number"
              placeholder="Enter OTP"
              disabled={!otpSent} // disable until OTP is sent
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
              {otpSent ? "Login" : "Send OTP"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
