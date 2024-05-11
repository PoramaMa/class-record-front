import { Layout, theme } from "antd";
import React from "react";
import Footer from "../components/Partials/Footer";
import Header from "../components/Partials/Header";
import SideBar from "../components/Partials/SideBar";

const { Content } = Layout;

const App = () => {
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
            <p>long content</p>
          </div>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default App;
