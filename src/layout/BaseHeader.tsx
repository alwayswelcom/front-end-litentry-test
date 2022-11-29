import React from "react";
import { Header } from "antd/es/layout/layout";
import { useSearchParams } from "react-router-dom";

const BaseHeader = () => {
  const [searchParams, _] = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{ padding: 0 }}
    >
      <div className="layout-header-title">
        {currentCategory.toLocaleUpperCase() || "ALL"}
      </div>
    </Header>
  );
};

export default BaseHeader;
