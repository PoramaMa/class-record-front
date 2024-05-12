import { Avatar, Button, Input, List, Modal, Select, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";
const { Search } = Input;
const { Option } = Select;

const url = `${env.service_url}`;

const ListStudent = () => {
  const [loading, setLoading] = useState(false);

  const [dataSearch, setDataSearch] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  let query = "";

  const [dataStudentAll, setStudentAll] = useState([]);

  const fetchStudentAll = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/students/?q=${query}`);
      setStudentAll(response.data);
    } catch (err) {
      console.log("fetchStudentAll err :: ", err);
    } finally {
      setLoading(false);
      setIsSearch(false);
    }
  };

  const [dataClassroomAll, setClassroomAll] = useState([]);

  const fetchClassroomAll = async () => {
    try {
      const response = await axios.get(`${url}/classrooms`);
      setClassroomAll(response.data);
    } catch (err) {
      console.log("fetchClassroomAll err :: ", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const confirmResult = await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการลบ",
          content: "คุณแน่ใจหรือไม่ว่าต้องการลบนักเรียนคนนี้ ?",
          onOk: async () => {
            try {
              await axios.delete(`${url}/students/${id}`);
              await fetchStudentAll();
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
    fetchStudentAll();
    fetchClassroomAll();
  }, []);

  const handleSearchChange = (event) => {
    query = event.target.value;
    setDataSearch(event.target.value);
    setIsSearch(true);
    fetchStudentAll();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <Select
          placeholder="ปีการศึกษา"
          style={{
            marginRight: 10,
          }}
        >
          {[...Array(21)].map((_, index) => {
            const year = 2550 + index;
            return (
              <Option key={year} value={year.toString()}>
                {year}
              </Option>
            );
          })}
        </Select>
        <Select
          placeholder="ระดับชั้น"
          style={{
            marginRight: 10,
          }}
        >
          <Option value="1">ป.1</Option>
          <Option value="2">ป.2</Option>
          <Option value="3">ป.3</Option>
        </Select>
        <Select
          placeholder="ห้องเรียน"
          style={{
            marginRight: 10,
          }}
        >
          {dataClassroomAll.map((classroom) => (
            <Option key={classroom.classroom_id} value={classroom.classroom_id}>
              {classroom.room_number}
            </Option>
          ))}
        </Select>
        <Search
          style={{
            marginBottom: 20,
          }}
          placeholder="ค้นหาด้วย เลขประจำตัวนักเรียน, ชื่อ, นามสกุล"
          loading={isSearch && isSearch}
          onChange={handleSearchChange}
          enterButton
        />
      </div>

      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={dataStudentAll.length}
          next={fetchStudentAll}
          hasMore={dataStudentAll.length < 0}
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
            dataSource={dataStudentAll}
            renderItem={(item) => (
              <List.Item key={item.fname}>
                <List.Item.Meta
                  avatar={<Avatar src={img_user} />}
                  title={
                    <a href="#">
                      {item.title} {item.fname} {item.lname}
                    </a>
                  }
                  description={`เลขประจำตัว ${item.student_code}, ป.${item.grade_level}`}
                />
                <Link
                  to={`/view-student/${btoa(
                    item.student_id
                  )}?_=${uuidv4()}&ref=detail`}
                >
                  <Button type="primary" style={{ "margin-right": "5px" }}>
                    รายละเอียด
                  </Button>
                </Link>
                <Link
                  to={`/edit-student/${btoa(
                    item.student_id
                  )}?_=${uuidv4()}&ref=edit`}
                >
                  <Button style={{ "margin-right": "5px" }}>แก้ไข</Button>
                </Link>
                <Button
                  onClick={() => deleteStudent(item.student_id)}
                  style={{ margin: "0 5px" }}
                  type="primary"
                  danger
                >
                  ลบ
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
export default ListStudent;
