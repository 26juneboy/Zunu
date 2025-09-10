import React from "react";
import { Button } from "antd";
import { theme } from "../theme/theme";

const CommonButton = ({ text, type = "primary", onClick, block }) => {
  return (
    <Button
      type={type}
      block={block}
      onClick={onClick}
      style={{
        background: type === "primary" ? theme.secondaryColor : undefined,
        borderRadius: theme.buttonRadius,
      }}
    >
      {text}
    </Button>
  );
};

export default CommonButton;
