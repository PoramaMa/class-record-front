import { Card, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env } from "../../env";

const url = `${env.service_url}`;

const ViewClassroom = () => {
  const { id } = useParams();

  const [dataStudent, setStudent] = useState([]);

  const fetchStudentById = async (id) => {
    try {
      const response = await axios.get(`${url}/students/${atob(id)}`);
      console.log(response.data);
      setStudent(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  useEffect(() => {
    fetchStudentById(id);
  }, []);

  const formatDateThai = (isoDateString) => {
    const date = new Date(isoDateString);
    const thaiMonth = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const thaiDate = `${date.getDate()} ${thaiMonth[date.getMonth()]} ${
      date.getFullYear() + 543
    }`;
    return thaiDate;
  };

  const calculateAge = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const columns = [
    {
      title: "เลขห้อง",
      dataIndex: "classrooms.room_number",
      key: "classrooms.room_number",
    },
    {
      title: "Age",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Address",
      dataIndex: "student_id",
      key: "student_id",
    },
  ];

  const dataSource = [
    {
      class_map_id: 7,
      student_id: 1,
      classroom_id: 1,
      isActive: true,
      createdAt: "2024-05-11T19:41:40.000Z",
      updatedAt: "2024-05-11T19:41:40.000Z",
      classrooms: {
        classroom_id: 1,
        room_number: "221",
        room_name: "ห้องดนตรี",
        grade_level: "1",
        academic_year: 2567,
        teacher_name: "ครูสมชาย",
        isActive: true,
        createdAt: "2024-05-11T18:14:54.000Z",
        updatedAt: "2024-05-11T18:14:54.000Z",
      },
    },
    {
      class_map_id: 9,
      student_id: 1,
      classroom_id: 2,
      isActive: true,
      createdAt: "2024-05-11T19:42:03.000Z",
      updatedAt: "2024-05-11T19:42:03.000Z",
      classrooms: {
        classroom_id: 2,
        room_number: "222",
        room_name: "ห้องคอมพิวเตอร์",
        grade_level: "1",
        academic_year: 2567,
        teacher_name: "ครูสมหญิง",
        isActive: true,
        createdAt: "2024-05-11T18:20:25.000Z",
        updatedAt: "2024-05-11T18:20:25.000Z",
      },
    },
  ];

  return (
    <Space
      direction="vertical"
      size={20}
      style={{
        width: "100%",
      }}
    >
      <Card title="ข้อมูล" extra={<a href="#">More</a>}>
        <h3>ข้อมูลส่วนตัว</h3>
        <p>
          <b>ชื่อ - สกุล : </b> {dataStudent.title} {dataStudent.fname}{" "}
          {dataStudent.lname}
        </p>
        <p>
          {" "}
          <b>เพศ : </b>
          {dataStudent.gender}
        </p>
        <p>
          <b>วัน-เดือน-ปีเกิด : </b>
          {formatDateThai(dataStudent.birthdate)}
        </p>
        <p>
          <b>อายุ : </b>
          {calculateAge(dataStudent.birthdate)}
        </p>
        <h3>ข้อมูลนักเรียน</h3>
        <p>
          <b>เลขประจำตัว : </b> {dataStudent.student_code}
        </p>
        <p>
          <b>ระดับชั้นประถมศึกษาปีที่ : {dataStudent.grade_level} </b>
          {}
        </p>
        <hr />
        <h3>ข้อมูลห้องเรียน</h3>
        <Table dataSource={dataSource} columns={columns} />
      </Card>
    </Space>
  );
};
export default ViewClassroom;
