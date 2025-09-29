import React, { useEffect, useState } from "react";
import { Table, Button, Typography } from "antd";
import { theme } from "../theme/theme";
import "./quotes.css";
import Navbar from "./navbar";
import { Tabs } from "antd";
import NewListing from "./newListing";
import QuotesSent from "./quotesSent";
import RequestRecieved from "./requestRecieved";
import RequestSent from "./requestSent";
import { getQuotesListings } from "../services/service";
const { Title } = Typography;

const Quotes = () => {
  const [data, setData] = useState();
  const fetchData = async (current = 0, pageSize = 10) => {
    try {
      const response = await getQuotesListings(current, pageSize);
      setData(response.data.response);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchPaginatedData = (current, pageSize) => {
    fetchData(current, pageSize);
  };
  const items = [
    {
      key: "1",
      label: "New Listings",
      children: (
        <NewListing data={data} fetchPaginatedData={fetchPaginatedData} />
      ),
    },
    {
      key: "2",
      label: "Requests sent",
      children: <RequestSent />,
    },
    {
      key: "3",
      label: "Requests received",
      children: <RequestRecieved />,
    },
    {
      key: "4",
      label: "Quotes sent",
      children: <QuotesSent />,
    },
  ];
  return (
    <div className="quotes-container" style={{ fontFamily: theme.fontFamily }}>
      {/* Heading */}
      <Navbar title={"Quotes"} />
      <Tabs defaultActiveKey="1" items={items} className="quotes-tab" />;
    </div>
  );
};

export default Quotes;
