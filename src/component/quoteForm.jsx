import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { theme } from "../theme/theme";
import "./quoteForm.css";

const { Title } = Typography;

const QuoteForm = () => {
  const [form] = Form.useForm();

  // Dynamic structure for rooms & items
  const rooms = [
    {
      id: 1,
      name: "Room 1",
      items: [
        { id: "item1", label: "Item 1", hasQuantity: false },
        { id: "item2", label: "Item 2", hasQuantity: true },
        { id: "item3", label: "Item 3 (Model, Brand...)", hasQuantity: false },
      ],
    },
    {
      id: 2,
      name: "Room 2",
      items: [
        { id: "item4", label: "Item 4", hasQuantity: false },
        { id: "item5", label: "Item 5", hasQuantity: false },
        { id: "item6", label: "Item 6 (Model, Brand...)", hasQuantity: true },
        { id: "item7", label: "Item 7", hasQuantity: false },
      ],
    },
  ];

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div
      className="quote-form-container"
      style={{ fontFamily: theme.fontFamily }}
    >
      {/* Header */}
      <div className="quote-form-header">
        <Title level={2} className="quote-form-heading">
          Quote Form
        </Title>
        <Button type="primary" style={{ background: theme.secondaryColor }}>
          Edit
        </Button>
      </div>

      {/* Flex container with both cards */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Quote Form */}
        <Card className="quote-form-card">
          <Form layout="vertical" form={form} onFinish={onFinish}>
            {/* Homeowner Details */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Homeowner Name"
                  name="homeownerName"
                  rules={[{ required: true, message: "Please enter name" }]}
                >
                  <Input placeholder="Enter homeowner name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input placeholder="Enter address" />
                </Form.Item>
              </Col>
            </Row>

            {/* Dynamic Rooms */}
            {rooms.map((room) => (
              <div key={room.id}>
                <Title level={4}>{room.name}</Title>
                {room.items.map((item) => (
                  <Row gutter={16} key={item.id}>
                    <Col span={16}>
                      <Form.Item label={item.label} name={item.id}>
                        <Input placeholder={`Enter ${item.label}`} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Price" name={`${item.id}_price`}>
                        <Input prefix="₹" type="number" />
                      </Form.Item>
                    </Col>
                    {/* {item.hasQuantity && (
                      <Col span={8}>
                        <Form.Item label="Quantity" name={`${item.id}_qty`}>
                          <Input type="number" placeholder="Qty" />
                        </Form.Item>
                      </Col>
                    )} */}
                  </Row>
                ))}
              </div>
            ))}

            {/* Notes */}
            <Form.Item label="Additional Notes" name="notes">
              <Input.TextArea
                rows={4}
                placeholder="Write additional notes..."
              />
            </Form.Item>

            {/* Buttons */}
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="default">Save</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: theme.secondaryColor }}
                >
                  Send
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default QuoteForm;
