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
import { deleteDesign, getDesigns, uploadDesign } from "../services/service";

const { Title } = Typography;

const UploadDesigns = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewType, setPreviewType] = useState();

  // Query params
  const queryParams = new URLSearchParams(location.search);
  const homeOwnerName = queryParams.get("homeOwnerName");
  const address = queryParams.get("address");

  const uploadDesignHandler = async (file) => {
    try {
      const formData = new FormData();
      formData.append("content", file);

      const response = await uploadDesign(formData);

      if (response?.data) {
        fetchData();
      }

      console.log(`${file.name} uploaded successfully!`, response);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleDeleteDesign = async (designId) => {
    const response = await deleteDesign(designId);
    console.log(response);

    // remove from local state
    if (response?.responseStatus === "SUCCESS") {
      setData((prev) => prev.filter((d) => d.id !== designId));
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
                  return false;
                }}
                showUploadList={false}
                accept="image/*,video/*" // ✅ allow both
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>

            {/* Thumbnails row */}
            {/* Thumbnails row */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {data?.map((design) => (
                <div
                  key={design.id}
                  style={{
                    position: "relative",
                    width: 120,
                    height: 90,
                  }}
                >
                  {/* Delete button */}
                  <Button
                    size="small"
                    type="text"
                    danger
                    style={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      zIndex: 10,
                      background: "white",
                      borderRadius: "50%",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                    onClick={() => handleDeleteDesign(design.id)}
                  >
                    ✕
                  </Button>

                  {design.mediaType === "IMAGE" ? (
                    <img
                      src={design.designFileThumbnailUrl}
                      alt="Thumbnail"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 6,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                      onClick={() => {
                        setPreviewUrl(design.designFileUrl);
                        setPreviewType("IMAGE");
                        setPreviewVisible(true);
                      }}
                    />
                  ) : (
                    <video
                      src={
                        design.designFileThumbnailUrl || design.designFileUrl
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 6,
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      }}
                      onClick={() => {
                        setPreviewUrl(design.designFileUrl);
                        setPreviewType("VIDEO");
                        setPreviewVisible(true);
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Form>
        </Card>
      </div>

      {/* Preview Modal */}
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        centered
        width={800}
      >
        {previewType === "IMAGE" ? (
          <img
            alt="Full"
            style={{ width: "100%", borderRadius: 8 }}
            src={previewUrl}
          />
        ) : (
          <video
            controls
            style={{ width: "100%", borderRadius: 8 }}
            src={previewUrl}
          />
        )}
      </Modal>
    </div>
  );
};

export default UploadDesigns;
