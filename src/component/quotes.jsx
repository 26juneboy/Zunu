import React, { useEffect, useState } from "react";
import { Table, Button, Typography } from "antd";
import { theme } from "../theme/theme";
import "./quotes.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Quotes = (data, fetchPaginatedData) => {
  const navigate = useNavigate();
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    if (data?.data?.listings?.content) {
      setListingData(data.data.listings.content);
    }
  }, [data]);
  const [pagination, setPagination] = useState({
    current: data?.data?.listings?.pageable?.pageNumber + 1 || 1,
    pageSize: data?.data?.listings?.pageable?.pageSize || 10,
    total: data?.data?.listings?.totalElements || 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  // Define table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "companyName",
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
      dataIndex: "noOfYears",
      key: "budget",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          style={{
            background: theme.secondaryColor,
            borderRadius: theme.buttonRadius,
          }}
        >
          {record.actionFlags.quoteEditability === 1
            ? "Prepare Quote"
            : "View Quote"}
        </Button>
      ),
    },
  ];
  // 🔹 Handle page change
  const handleTableChange = (paginationConfig) => {
    setPagination(paginationConfig);

    fetchPaginatedData(paginationConfig.current - 1, paginationConfig.pageSize);
  };
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="quotes-container" style={{ fontFamily: theme.fontFamily }}>
      {/* Heading */}
      <div className="quotes-title-container" style={{}}>
        <Title level={2} className="quotes-heading">
          Quotes
        </Title>
        <Button
          type="default"
          danger
          onClick={handleLogout}
          style={{ borderRadius: theme.buttonRadius }}
        >
          Logout
        </Button>
      </div>

      <Table
        dataSource={listingData}
        columns={columns}
        rowKey="id"
        bordered
        pagination={pagination}
        onChange={handleTableChange}
        className="quotes-table"
      />
    </div>
  );
};

export default Quotes;
