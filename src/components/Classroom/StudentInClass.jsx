import { Avatar, Button, List, Modal, Skeleton, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";

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
      console.log(response.data);
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  const deleteClassMap = async (id) => {
    try {
      const confirmResult = await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการลบ",
          content: "คุณแน่ใจหรือไม่ว่าต้องการลบนักเรียนออกจาก Classroom นี้ ?",
          onOk: async () => {
            try {
              await axios.delete(`${url}/class-maps/${id}`);
              await fetchClassMapByRoomId();
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
    },
    {
      title: "ลบ",
      dataIndex: "",
      key: "",
    },
  ];

  const dataSource = dataStudent;

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={dataStudentInClass.length}
        next={fetchClassMapByRoomId}
        hasMore={dataStudentInClass.length < 0}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={dataStudentInClass}
          renderItem={(item) => (
            <List.Item key={item.fname}>
              <List.Item.Meta
                avatar={<Avatar src={img_user} />}
                title={
                  <a href="https://ant.design">
                    {item.students.title} {item.students.fname}{" "}
                    {item.students.lname}
                  </a>
                }
                description={`เลขประจำตัว ${item.students.student_code}, ป.${item.students.grade_level}`}
              />

              <Button
                onClick={() => deleteClassMap(item.class_map_id)}
                style={{ "margin-right": "5px" }}
                type="primary"
                danger
              >
                ลบ
              </Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default StudentInClass;
