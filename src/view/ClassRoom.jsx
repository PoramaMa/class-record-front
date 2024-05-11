import { Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import EditClassroom from "../components/Classroom/EditClassroom";
import FormClassroom from "../components/Classroom/FormClassroom";
import ListClassroom from "../components/Classroom/ListClassroom";
import ViewClassroom from "../components/Classroom/ViewClassroom";
import SideBar from "../components/Partials/SideBar";

const { Header, Content, Footer } = Layout;

const Classroom = () => {
  const [ref, setRef] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const refParam = queryParams.get("ref");
    if (refParam) {
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
            minHeight: "80vh",
          }}
        >
          <h3>จัดการห้องเรียน </h3>
          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {ref === "all" && <ListClassroom />}
            {ref === "add" && <FormClassroom />}
            {ref === "edit" && <EditClassroom />}
            {ref === "detail" && <ViewClassroom />}
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
export default Classroom;
