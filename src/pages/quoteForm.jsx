import React, { useEffect, useState } from "react";
import QuoteForm from "../component/quoteForm";
import { getQuoteByUserID } from "../services/service";

const QuoteFormPage = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const response = await getQuoteByUserID();
      setData(response.data.response);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <QuoteForm data={data} />;
};

export default QuoteFormPage;
