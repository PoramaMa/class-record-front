import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
const { Sider } = Layout;
const items = [
  {
    key: "sub1",
    label: "Student Management",
    icon: <TeamOutlined />,
    children: [
      {
        key: "1",
        label: "List all",
      },
      {
        key: "2",
        label: "Add student",
      },
    ],
  },
  {
    key: "sub2",
    label: "ClassRoom Management",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "3",
        label: "List all",
      },
      {
        key: "4",
        label: "Add classroom",
      },
    ],
  },
];
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
        <div
          className="demo-logo-vertical"
          style={{
            height: "40px",
            width: "90%",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,.2)",
            margin: "10px auto",
          }}
        />
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
