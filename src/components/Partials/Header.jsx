import { Layout, theme } from "antd";
import React from "react";
const { Header } = Layout;
const _Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      />
    </>
  );
};

export default _Header;
