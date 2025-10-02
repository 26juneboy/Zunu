import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Select,
  Upload,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { theme } from "../theme/theme";
import "./quoteForm.css";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import { getDesigns, uploadDesign } from "../services/service";

const { Title } = Typography;

const UploadDesigns = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Create URLSearchParams object
  const queryParams = new URLSearchParams(location.search);
  const homeOwnerName = queryParams.get("homeOwnerName");
  const address = queryParams.get("address");

  const uploadDesignHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("content", file);

      const response = await uploadDesign(formData);

      if (response?.data) {
        const newDesign = {
          id: Date.now().toString(), // temporary id (or use backend id if returned later)
          designFileUrl: response.data.fileLocation,
          designFileThumbnailUrl: response.data.thumnbNailLocation,
          mediaType: "IMAGE",
        };

        setData((prev) => (prev ? [...prev, newDesign] : [newDesign]));
      }

      console.log(`${file.name} uploaded successfully!`, response);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const fetchData = async () => {
    const response = await getDesigns();
    if (response?.data?.response) {
      setData(response.data.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="quote-form-container"
      style={{ fontFamily: theme.fontFamily }}
    >
      <Navbar title={"Designs"} buttonName={"Edit"} />
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
              <Input placeholder={`${homeOwnerName}`} disabled />
            </Form.Item>

            <Form.Item label="Address" name="upload_address">
              <Input placeholder={`${address}`} disabled />
            </Form.Item>

            <Form.Item label="Room" name="upload_room">
              <Select placeholder="Select room">
                <Select.Option value="room1">Room 1</Select.Option>
                <Select.Option value="room2">Room 2</Select.Option>
              </Select>
            </Form.Item>

            {/* Upload button */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <Upload
                beforeUpload={(file) => {
                  uploadDesignHandler(file);
                  return false; // prevent auto upload
                }}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>

            {/* Thumbnails row */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {data?.map((design) => (
                <img
                  key={design.id}
                  src={design.designFileThumbnailUrl}
                  alt="Thumbnail"
                  style={{
                    width: 120,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => {
                    setPreviewImage(design.designFileUrl);
                    setPreviewVisible(true);
                  }}
                />
              ))}
            </div>
          </Form>
        </Card>
      </div>

      {/* Image Preview Modal */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
      >
        <img
          alt="Full"
          style={{ width: "100%", borderRadius: 8 }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default UploadDesigns;
