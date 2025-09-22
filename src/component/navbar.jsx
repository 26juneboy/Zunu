import React from "react";
import { theme } from "../theme/theme";
import { useNavigate } from "react-router-dom";
import { Button, Row, Typography } from "antd";
import "./navbar.css";
const { Title } = Typography;
const Navbar = ({ title, buttonName }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="navbar-header">
      <Title level={2} className="navbar-heading">
        {title}
      </Title>
      <Row style={{ gap: "10px" }}>
        {buttonName && (
          <Button type="primary" style={{ background: theme.secondaryColor }}>
            {buttonName}
          </Button>
        )}
        <Button
          type="default"
          danger
          onClick={handleLogout}
          style={{ borderRadius: theme.buttonRadius }}
        >
          Logout
        </Button>
      </Row>
    </div>
  );
};

export default Navbar;
