import React, { useEffect, useState } from "react";
import Quotes from "../component/quotes";
import { getQuotesListings } from "../services/service";
const QuotesPage = () => {
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
  return <Quotes data={data} fetchPaginatedData={fetchPaginatedData} />;
};

export default QuotesPage;
