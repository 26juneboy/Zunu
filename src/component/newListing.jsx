import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { Button, Table, Modal } from "antd";
import { Popover } from "antd";
const NewListing = ({ data, fetchPaginatedData, loading }) => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (data?.listings?.content) {
      // Transform data into table format
      const dataSource = data?.listings?.content?.map((item, index) => {
        const menu = (
          <Menu>
            <Menu.Item
              key="quote"
              onClick={() =>
                handlePreviewQuote(
                  item.name,
                  `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
                  item.userId
                )
              }
            >
              {item.actionFlags.quoteEditability === 1
                ? "Prepare Quote"
                : "View Quote"}
            </Menu.Item>
            <Menu.Item
              key="upload"
              onClick={() =>
                handleUploadDesign(
                  item.name,
                  `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
                  item.userId
                )
              }
            >
              Upload Design
            </Menu.Item>
          </Menu>
        );

        return {
          key: index,
          name: item.name || "N/A",
          address: `${item.asset.houseNumber}, ${item.asset.addressLine}, ${item.asset.city}, ${item.asset.country}`,
          budget: `${item.asset.budgetMin} - ${item.asset.budgetMax}`,
          floorPlan: {
            thumbnail: item.asset.floorPlanUrlMap?.Thumbnail,
            full: item.asset.floorPlanUrlMap?.Original,
          },
          actions: (
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <MoreOutlined style={{ fontSize: 18, cursor: "pointer" }} />
            </Dropdown>
          ),
        };
      });
      setListingData(dataSource);
    }
  }, [data]);

  const [pagination, setPagination] = useState({
    current: data?.listings?.pageable?.pageNumber + 1 || 1,
    pageSize: data?.listings?.pageable?.pageSize || 10,
    total: data?.listings?.totalElements || 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  const handlePreviewQuote = (name, address, userId) => {
    navigate(
      `/quote?homeOwnerName=${name}&address=${address}&userId=${userId}`
    );
  };
  const handleUploadDesign = (name, address, userId) => {
    navigate(
      `/upload?homeOwnerName=${name}&address=${address}&userId=${userId}`
    );
  };

  const handleImageClick = (fullUrl) => {
    setSelectedImage(fullUrl);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedImage("");
  };

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },
    {
      title: "Budget",
      dataIndex: "budget",
      key: "budget",
    },
    {
      title: "Floor Plan",
      dataIndex: "floorPlan",
      key: "floorPlan",
      render: (floorPlan) =>
        floorPlan?.thumbnail ? (
          <img
            src={floorPlan.thumbnail}
            alt="Floor Plan Thumbnail"
            style={{
              width: 80,
              height: 60,
              cursor: "pointer",
              borderRadius: 6,
            }}
            onClick={() => handleImageClick(floorPlan.full)}
          />
        ) : (
          "N/A"
        ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 80,
      align: "center",
    },
  ];

  // 🔹 Handle page change
  const handleTableChange = (paginationConfig) => {
    setPagination(paginationConfig);
    fetchPaginatedData(paginationConfig.current - 1, paginationConfig.pageSize);
  };

  return (
    <div>
      <Table
        loading={loading}
        dataSource={listingData}
        columns={columns}
        rowKey="id"
        bordered
        pagination={pagination}
        onChange={handleTableChange}
        className="quotes-table"
      />

      {/* Modal for Full Image */}
      <Modal
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        <img
          src={selectedImage}
          alt="Full Floor Plan"
          style={{
            width: "90%",
            objectFit: "contain",
          }}
        />
      </Modal>
    </div>
  );
};

export default NewListing;
