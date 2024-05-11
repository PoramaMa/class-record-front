import {
  AppstoreOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const items = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: "Home",
    path: "/",
  },
  {
    key: "sub1",
    label: "Student Management",
    icon: <TeamOutlined />,
    children: [
      {
        key: "2",
        label: "List all",
        path: "/students",
      },
      {
        key: "3",
        label: "Add student",
        path: "/add-student",
      },
    ],
  },
  {
    key: "sub2",
    label: "ClassRoom Management",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "4",
        label: "List all",
        path: "/classrooms",
      },
      {
        key: "5",
        label: "Add classroom",
        path: "/add-classroom",
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          {items.map((item) =>
            item.children ? (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    <Link to={child.path}>{child.label}</Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;
