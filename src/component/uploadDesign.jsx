import React from "react";
import { Form, Input, Button, Typography, Card, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { theme } from "../theme/theme";
import "./quoteForm.css"; // ✅ reusing the same CSS

const { Title } = Typography;

const UploadDesigns = () => {
  return (
    <div
      className="quote-form-container"
      style={{ fontFamily: theme.fontFamily }}
    >
      {/* Header */}
      <div className="quote-form-header">
        <Title level={2} className="quote-form-heading">
          Upload Designs
        </Title>
        <Button type="primary" style={{ background: theme.secondaryColor }}>
          Edit
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card className="quote-form-card">
          <Form layout="vertical">
            <Form.Item label="Homeowner Name" name="upload_homeowner">
              <Input placeholder="Enter homeowner name" />
            </Form.Item>

            <Form.Item label="Address" name="upload_address">
              <Input placeholder="Enter address" />
            </Form.Item>

            <Form.Item label="Room" name="upload_room">
              <Select placeholder="Select room">
                <Select.Option value="room1">Room 1</Select.Option>
                <Select.Option value="room2">Room 2</Select.Option>
              </Select>
            </Form.Item>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Upload>
                <Button icon={<UploadOutlined />}>Image</Button>
              </Upload>
              <Upload>
                <Button icon={<UploadOutlined />}>Video</Button>
              </Upload>
            </div>

            <Form.Item>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  type="primary"
                  style={{ background: theme.secondaryColor, width: "25%" }}
                  block
                >
                  Upload
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UploadDesigns;
