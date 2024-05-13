import { Button, Card, Modal, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { env } from "../../env";

const url = `${env.service_url}`;

const ListRegister = () => {
  const [dataRegister, setRegister] = useState([]);
  const fetchRegister = async () => {
    try {
      const response = await axios.get(`${url}/class-maps`);
      setRegister(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  useEffect(() => {
    fetchRegister();
  }, []);

  const deleteClassMap = async (id) => {
    try {
      const confirmResult = await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการลบ",
          content: "คุณแน่ใจหรือไม่ว่าต้องการลบการลงทะเบียนนี้ ?",
          onOk: async () => {
            try {
              await axios.delete(`${url}/class-maps/${id}`);
              await fetchRegister();
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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      title: "เลขประจำตัวนักเรียน",
      dataIndex: "students.student_code",
      key: "students.student_code",
      render: (_, i) => <p>{i.students.student_code}</p>,
    },
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "students.title",
      key: "students.title",
      render: (_, i) => (
        <p>
          {i.students.title} {i.students.fname} {i.students.lname}
        </p>
      ),
    },
    {
      title: "ระดับชั้น",
      dataIndex: "grade_level",
      key: "grade_level",
      render: (_, i) => <p> ป.{i.students.grade_level}</p>,
    },
    {
      title: "ปีการศึกษา",
      dataIndex: "academic_year",
      key: "academic_year",
      render: (_, i) => <p>{i.classrooms.academic_year}</p>,
    },
    {
      title: "เลขห้อง",
      dataIndex: "room_number",
      key: "room_number",
      render: (_, i) => <p>{i.classrooms.room_number}</p>,
    },
    {
      title: "ชื่อห้อง",
      dataIndex: "room_name",
      key: "room_name",
      render: (_, i) => <p>{i.classrooms.room_name}</p>,
    },

    {
      title: "ครูประจำชั้น",
      dataIndex: "teacher_name",
      key: "teacher_name",
      render: (_, i) => <p>{i.classrooms.teacher_name}</p>,
    },
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, i) => <p>{formatDate(i.createdAt)}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, i) => (
        <Space size="middle">
          <Button
            onClick={() => deleteClassMap(i.class_map_id)}
            style={{ "margin-right": "5px" }}
            type="primary"
            danger
          >
            ลบ
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = dataRegister;

  return (
    <Space
      direction="vertical"
      size={20}
      style={{
        width: "100%",
      }}
    >
      <Card title="รายการลงทะเบียนเรียนทั้งหมด" extra={<a href="#">.</a>}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 4,
          }}
        />
        <p>จำนวนทั้งหมด : {dataRegister.length} รายการ</p>
      </Card>
    </Space>
  );
};
export default ListRegister;
