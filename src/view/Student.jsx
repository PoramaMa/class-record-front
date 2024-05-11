import { Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import FormStudent from "../components/FormStudent";
import ListStudent from "../components/ListStudent";
import SideBar from "../components/Partials/SideBar";
const { Header, Content, Footer } = Layout;

const Student = () => {
  const [ref, setRef] = useState("");

  const location = useLocation();

  let refData = "";

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refParam = queryParams.get("ref");
    if (refParam) {
      refData = refParam;
      setRef(refParam);
    }
  }, [location]);

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
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <h3>Student Management </h3>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* ใช้เงื่อนไขเพื่อตรวจสอบค่า refData แล้วแสดง FormStudent ตามเงื่อนไข */}
            {refData == "all" && <FormStudent />}
            {/* ใช้เงื่อนไขเพื่อตรวจสอบค่า refData แล้วแสดง ListStudent ตามเงื่อนไข */}
            {refData == "add" && <ListStudent />}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Student;
