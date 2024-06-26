import { Button, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { env } from "../../env";
const { Search } = Input;

const url = `${env.service_url}`;

const StudentInClass = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [dataStudentInClass, setStudentInClass] = useState([]);

  const fetchClassMapByRoomId = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/class-maps/room/${atob(id)}`);
      setStudentInClass(response.data);
    } catch (err) {
      console.log("fetchClassMapByRoomId err :: ", err);
    } finally {
      setLoading(false);
    }
  };

  const [dataStudent, setStudent] = useState([]);

  const fetchStudentById = async () => {
    try {
      const response = await axios.get(`${url}/students/room/${atob(id)}`);
      setStudent(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  const deleteClassMap = async (id) => {
    try {
      await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการลบ",
          content: "คุณแน่ใจหรือไม่ว่าต้องการนำนักเรียนออกจาก Classroom นี้ ?",
          onOk: async () => {
            try {
              await axios.delete(`${url}/class-maps/${id}`);
              await fetchClassMapByRoomId();
              await fetchStudentById();
            } catch (err) {
              console.log("err :: ", err);
            }
            resolve(true);
          },
          onCancel: () => resolve(false),
        });
      });
    } catch (err) {
      console.log("err :: ", err);
    }
  };

  useEffect(() => {
    fetchClassMapByRoomId();
    fetchStudentById();
  }, []);

  const columns = [
    {
      title: "เลขประจำตัว",
      dataIndex: "student_code",
      key: "student_code",
    },
    {
      title: "คำนำหน้า",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "ชื่อ",
      dataIndex: "fname",
      key: "fname",
      render: (_, i) => (
        <Link
          to={`/view-student/${btoa(i.student_id)}?_=${uuidv4()}&ref=detail`}
        >
          {i.fname}
        </Link>
      ),
    },
    {
      title: "นามสกุล",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "ระดับชั้น",
      dataIndex: "grade_level",
      key: "grade_level",
      render: (text) => <p>ป.{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, dataStudent) => (
        <Space size="middle">
          <Button
            onClick={() =>
              deleteClassMap(dataStudent.class_maps[0].class_map_id)
            }
            style={{ "margin-right": "5px" }}
            type="primary"
            danger
          >
            นำออก
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = dataStudent;

  return (
    <>
      <div
        id="scrollableDiv"
        style={{
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 4, // จำนวนรายการต่อหน้า
          }}
        />
      </div>
      <p>จำนวนนักเรียนในห้อง : {dataStudent.length} คน</p>
    </>
  );
};
export default StudentInClass;
