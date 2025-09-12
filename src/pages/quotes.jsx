import React from "react";
import { Button, Typography } from "antd";
import { theme } from "../theme/theme";
import "./quotes.css"; // 👈 import css file

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
  return (
    <div className="quotes-container" style={{ fontFamily: theme.fontFamily }}>
      {/* Heading */}
      <Title level={2} className="quotes-heading">
        Quotes
      </Title>

      <div className="quotes-list">
        {data.map((item) => (
          <div key={item.id} className="quote-card">
            {/* Left Text Section */}
            <div className="quote-text">
              <p className="quote-name">{item.name}</p>
              <p className="quote-address">{item.address}</p>
              <p className="quote-budget">{item.budget}</p>
            </div>

            {/* Right Button Section */}
            <div className="quote-button">
              <Button
                type="primary"
                style={{
                  background: theme.secondaryColor,
                  borderRadius: theme.buttonRadius,
                }}
              >
                Prepare Quote
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesPage;
