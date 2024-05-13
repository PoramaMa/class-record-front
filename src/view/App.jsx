import { Input, Layout, Table, theme } from "antd";
import React, { useState } from "react";
const { Search } = Input;

import Footer from "../components/Partials/Footer";
import Header from "../components/Partials/Header";
import SideBar from "../components/Partials/SideBar";

const { Content } = Layout;

const App = () => {
  const [dataSearch, setDataSearch] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dataSource = [
    {
      key: "1",
      name: 1,
      age: 32,
      address: 20,
    },
    {
      key: "2",
      name: 2,
      age: 42,
      address: 15,
    },
  ];

  const columns = [
    {
      title: "ชั้นเรียน",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "จำนวนห้อง",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "จำนวนนักเรียน",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Layout hasSider>
      <SideBar />
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "80vh",
            }}
          >
            <Table columns={columns} dataSource={dataSource} />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default App;
