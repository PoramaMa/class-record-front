import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
const { Sider } = Layout;
const menuItem = ["Student Management", "ClassRoom Management"];
const items = [TeamOutlined, AppstoreOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: menuItem[index],
}));
const SideBar = () => {
  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
    </>
  );
};

export default SideBar;
