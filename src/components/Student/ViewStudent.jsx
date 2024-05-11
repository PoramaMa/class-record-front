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
      setStudent(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  const [dataClassroom, setClassroom] = useState([]);
  const fetchClassroomById = async (id) => {
    try {
      const response = await axios.get(
        `${url}/classrooms/students/${atob(id)}`
      );
      setClassroom(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  useEffect(() => {
    fetchStudentById(id);
    fetchClassroomById(id);
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
      dataIndex: "room_number",
      key: "room_number",
    },
    {
      title: "ชื่อห้อง",
      dataIndex: "room_name",
      key: "room_name",
    },
    {
      title: "ระดับชั้น",
      dataIndex: "grade_level",
      key: "grade_level",
    },
    {
      title: "ครูประจำชั้น",
      dataIndex: "teacher_name",
      key: "teacher_name",
    },
    {
      title: "ปีการศึกษา",
      dataIndex: "academic_year",
      key: "academic_year",
    },
  ];

  const dataSource = dataClassroom;

  return (
    <Space
      direction="vertical"
      size={20}
      style={{
        width: "100%",
      }}
    >
      <Card title="ข้อมูล" extra={<a href="#"></a>}>
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
