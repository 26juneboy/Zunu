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
import {
  getListingsQuotesSent,
  getListingsRequestRecieved,
  getListingsRequestSent,
  getQuotesListings,
} from "../services/service";
const { Title } = Typography;

const Quotes = () => {
  const [data, setData] = useState();
  const [reqSentData, setRequestSentData] = useState();
  const [reqRecievedData, setRequestRecievedData] = useState();
  const [quotesSentData, setQuotesSentData] = useState();
  const [loading, setLoading] = useState(false);
  const fetchData = async (current = 0, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await getQuotesListings(current, pageSize);
      const reqSentResponse = await getListingsRequestSent(current, pageSize);
      const reqRecievedResponse = await getListingsRequestRecieved(
        current,
        pageSize
      );
      const quotesSentResponse = await getListingsQuotesSent(current, pageSize);
      setRequestSentData(reqSentResponse.data.response);
      setRequestRecievedData(reqRecievedResponse.data.response);
      setData(response.data.response);
      setQuotesSentData(quotesSentResponse.data.response);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
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
        <NewListing
          data={data}
          fetchPaginatedData={fetchPaginatedData}
          loading={loading}
        />
      ),
    },
    {
      key: "2",
      label: "Requests sent",
      children: (
        <RequestSent
          data={reqSentData}
          fetchPaginatedData={fetchPaginatedData}
        />
      ),
    },
    {
      key: "3",
      label: "Requests received",
      children: (
        <RequestRecieved
          data={reqRecievedData}
          fetchPaginatedData={fetchPaginatedData}
        />
      ),
    },
    {
      key: "4",
      label: "Quotes sent",
      children: (
        <QuotesSent
          data={quotesSentData}
          fetchPaginatedData={fetchPaginatedData}
        />
      ),
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
