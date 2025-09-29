import React, { useEffect, useState } from "react";
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
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { getQuoteByUserID } from "../services/service";

const { Title } = Typography;

const QuoteForm = () => {
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const location = useLocation();

  // Create URLSearchParams object
  const queryParams = new URLSearchParams(location.search);
  // Get values
  const homeOwnerName = queryParams.get("homeOwnerName");
  const address = queryParams.get("address");
  const userId = queryParams.get("userId");
  const fetchData = async () => {
    try {
      const response = await getQuoteByUserID(userId);
      setData(response.data.response);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = (values) => {
    console.log("Form Submitted:", values);
  };
  return (
    <div
      className="quote-form-container"
      style={{ fontFamily: theme.fontFamily }}
    >
      {/* Header */}
      <Navbar title={"Quote-Form"} buttonName={"Edit"} />

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
                  <Input placeholder={`${homeOwnerName}`} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter address" }]}
                >
                  <Input placeholder={`${address}`} disabled />
                </Form.Item>
              </Col>
            </Row>

            {/* Dynamic Rooms */}
            {data?.quoteItems?.map((room) => (
              <>
                {room?.subLevel?.length >= 0 && (
                  <div key={room.id}>
                    <Row style={{ marginBottom: "10px" }}>
                      <Col span={16}>
                        <Title level={4}>{room.roomName}</Title>
                      </Col>
                      <Col span={8}>
                        <Title level={4} style={{ paddingLeft: "12px" }}>
                          {" "}
                          Price
                        </Title>
                      </Col>
                    </Row>
                    {room?.subLevel?.map((item) => (
                      <>
                        <Row gutter={16} key={item.id}>
                          <Col span={16}>
                            <Form.Item name={item.id}>
                              <Input
                                placeholder={`${item.itemName}`}
                                disabled
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item name={`${item.id}_price`}>
                              <Input prefix="₹" type="number" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    ))}
                  </div>
                )}
              </>
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
