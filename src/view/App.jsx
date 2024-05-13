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

  const [dataStudent, setDataStudent] = useState({});
  const [dataClassroom, setDataClassroom] = useState({});

  const fetchStudentAndClassroomByGradeLevel = async (level) => {
    try {
      const studentResponse = await axios.get(`${url}/students/grade/${level}`);
      const classroomResponse = await axios.get(
        `${url}/classrooms/grade/${level}`
      );

      const studentKey = `dataStudentGrade${level}`;
      const classroomKey = `dataClassroomGrade${level}`;

      setDataStudent((prevData) => ({
        ...prevData,
        [studentKey]: studentResponse.data,
      }));

      setDataClassroom((prevData) => ({
        ...prevData,
        [classroomKey]: classroomResponse.data,
      }));
    } catch (err) {
      console.log(
        `fetchStudentAndClassroomByGradeLevel(${level}) err :: `,
        err
      );
    }
  };

  useEffect(() => {
    for (let i = 1; i <= 3; i++) {
      fetchStudentAndClassroomByGradeLevel(i);
    }
  }, []);

  const columnsClass = [
    {
      title: "เลขที่ห้อง",
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "ห้องเรียน",
      dataIndex: "room_name",
      key: "room_name",
    },
    {
      title: "จำนวนนักเรียนในห้อง",
      dataIndex: "class_maps",
      render: (classMaps) => classMaps.length,
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
      render: (text, record) =>
        `${record.title} ${record.fname} ${record.lname}`,
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
            {[1, 2, 3].map((level) => (
              <Card
                key={`grade${level}`}
                type="inner"
                title={`ชั้นประถมศึกษาปีที่ ${level}`}
                style={{
                  marginTop: level === 1 ? 0 : 16,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Table
                    style={{ width: "49%" }}
                    columns={columnStudents}
                    dataSource={dataStudent[`dataStudentGrade${level}`]}
                  />
                  <Table
                    style={{ width: "49%" }}
                    columns={columnsClass}
                    dataSource={dataClassroom[`dataClassroomGrade${level}`]}
                  />
                </div>
              </Card>
            ))}
          </Card>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default App;
