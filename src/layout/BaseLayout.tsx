import BaseHeader from "./BaseHeader";
import BaseSideBar from "./BaseSideBar";
import React from "react";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import BaseFooter from "./BaseFooter";

const BaseLayout = () => {
  return (
    <Layout hasSider>
      <BaseSideBar />

      <Layout className="custom-layout">
        <BaseHeader />
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
        <BaseFooter />
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
