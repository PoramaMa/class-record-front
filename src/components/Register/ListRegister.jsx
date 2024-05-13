import { Card, Space, Table } from "antd";
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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      title: "ลำดับ",
      render: (text, record) => <p>{record.class_map_id}</p>,
    },
    {
      title: "ชื่อ-สกุล",
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
      <Card title="รายการลงทะเบียนทั้งหมด" extra={<a href="#">.</a>}>
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
