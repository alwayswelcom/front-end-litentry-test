import React from "react";
import { Footer } from "antd/es/layout/layout";

const BaseFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Resource Paper ©{new Date().getFullYear()}
    </Footer>
  );
};

export default BaseFooter;
