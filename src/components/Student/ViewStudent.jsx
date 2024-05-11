import { Card, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { env } from "../../env";

const url = `${env.service_url}`;

const ViewClassroom = () => {
  const { id } = useParams();

  const [dataStudent, setStudent] = useState([]);

  const fetchStudentById = async () => {
    try {
      const response = await axios.get(`${url}/students/${atob(id)}`);
      setStudent(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  useEffect(() => {
    fetchStudentById();
  }, []);

  return (
    <Space
      direction="vertical"
      size={20}
      style={{
        width: "100%",
      }}
    >
      <Card title="ข้อมูลนักเรียน" extra={<a href="#">More</a>}>
        <h4>ข้อมูลส่วนตัว</h4>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Space>
  );
};
export default ViewClassroom;
