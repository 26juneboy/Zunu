import React, { useEffect } from "react";
import { Table, Button, Typography } from "antd";
import { theme } from "../theme/theme";
import "./quotes.css";
import { useNavigate } from "react-router-dom";
import { getQuotesListings } from "../services/service";

const { Title } = Typography;

const data = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St, New York, USA",
    budget: "$5,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "45 Park Ave, San Francisco, USA",
    budget: "$7,500",
  },
  {
    id: 3,
    name: "Robert Brown",
    address: "78 High St, Los Angeles, USA",
    budget: "$10,000",
  },
  {
    id: 4,
    name: "Emily Davis",
    address: "67 Queen Rd, Chicago, USA",
    budget: "$8,000",
  },
];

const QuotesPage = () => {
  const navigate = useNavigate();
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
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="primary"
          style={{
            background: theme.secondaryColor,
            borderRadius: theme.buttonRadius,
          }}
        >
          Prepare Quote
        </Button>
      ),
    },
  ];

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getQuotesListings();
        console.log(response);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchData();
  }, []);
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
        dataSource={data}
        columns={columns}
        rowKey="id"
        bordered
        pagination={true}
        className="quotes-table"
      />
    </div>
  );
};

export default QuotesPage;
