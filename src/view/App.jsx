import { Layout, theme, Input } from "antd";
const { Search } = Input;
import React, { useEffect, useState } from "react";

import Header from "../components/Partials/Header";
import SideBar from "../components/Partials/SideBar";
import Footer from "../components/Partials/Footer";

const { Content } = Layout;

const App = () => {
  const [dataSearch, setDataSearch] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
            <Search
              placeholder="input search text"
              enterButton="Search"
              size="large"
              loading
            />
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default App;
