import { Card, Input, Layout, Table, theme } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Partials/Footer";
import Header from "../components/Partials/Header";
import SideBar from "../components/Partials/SideBar";
import { env } from "../env";
const { Search } = Input;

const url = `${env.service_url}`;

const { Content } = Layout;

const App = () => {
  const [dataSearch, setDataSearch] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [dataStudent, setStudent] = useState([]);

  const fetchStudentByGradeLevel = async (level) => {
    try {
      const response = await axios.get(`${url}/students/grade/${level}`);
      setStudent(response.data);
      // console.log(response.data);
    } catch (err) {
      console.log("fetchStudentByGradeLevel err :: ", err);
    }
  };

  useEffect(() => {
    fetchStudentByGradeLevel(1);
    fetchStudentByGradeLevel(2);
    fetchStudentByGradeLevel(3);
  }, []);

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
      title: "ห้องเรียน",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "จำนวนนักเรียนในห้อง",
      dataIndex: "address",
      key: "address",
    },
  ];

  const columnStudents = [
    {
      title: "เลขประจำตัวนักเรียน",
      dataIndex: "student_code",
      key: "student_code",
    },
    {
      title: "ชื่อจริง - นามสกุล",
      dataIndex: "lname",
      key: "lname",
      render: (_, dataStudent) => (
        <p>
          {dataStudent.title}
          {dataStudent.fname} {dataStudent.lname}
        </p>
      ),
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
          <Card title="Summary Report">
            <Card
              type="inner"
              title="ชั้นประถมศึกษาปีที่ 1"
              extra={<a href="#">More</a>}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Table
                  style={{ width: "49%" }}
                  columns={columnStudents}
                  dataSource={dataStudent}
                />
                <Table
                  style={{ width: "49%" }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </div>
            </Card>
            <Card
              style={{
                marginTop: 16,
              }}
              type="inner"
              title="ชั้นประถมศึกษาปีที่ 2"
              extra={<a href="#">More</a>}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Table
                  style={{ width: "49%" }}
                  columns={columnStudents}
                  dataSource={dataStudent}
                />
                <Table
                  style={{ width: "49%" }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </div>
            </Card>
            <Card
              style={{
                marginTop: 16,
              }}
              type="inner"
              title="ชั้นประถมศึกษาปีที่ 3"
              extra={<a href="#">More</a>}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Table
                  style={{ width: "49%" }}
                  columns={columnStudents}
                  dataSource={dataStudent}
                />
                <Table
                  style={{ width: "49%" }}
                  columns={columns}
                  dataSource={dataSource}
                />
              </div>
            </Card>
          </Card>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};
export default App;
