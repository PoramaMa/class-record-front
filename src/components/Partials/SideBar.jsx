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
    label: "หน้าหลัก",
    path: "/",
  },
  {
    key: "sub1",
    label: "จัดการนักเรียน",
    icon: <TeamOutlined />,
    children: [
      {
        key: "2",
        label: "นักเรียนทั้งหมด",
        path: "/students?ref=all",
      },
      {
        key: "3",
        label: "เพิ่มนักเรียน",
        path: "/add-student?ref=add",
      },
    ],
  },
  {
    key: "sub2",
    label: "จัดการห้องเรียน",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "4",
        label: "ห้องเรียนทั้งหมด",
        path: "/classrooms?ref=all",
      },
      {
        key: "5",
        label: "เพิ่มห้องเรียน",
        path: "/add-classroom?ref=add",
      },
    ],
  },
  {
    key: "sub3",
    label: "ทะเบียนนักเรียน",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "6",
        label: "รายการทะเบียน",
        path: "/register?ref=all",
      },
      {
        key: "7",
        label: "ลงทะเบียนนักเรียน",
        path: "/add-register?ref=add",
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
            width: "95%",
            borderRadius: "10px",
            backgroundColor: "rgba(255,255,255,.2)",
            margin: "10px auto",
          }}
        >
          <h3
            style={{
              padding: "10px 5px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            Classroom Record
          </h3>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1", "sub2", "sub3"]}
        >
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
