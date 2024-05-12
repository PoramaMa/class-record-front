import { Button, List, Modal, Skeleton, Input } from "antd";
const { Search } = Input;
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { env } from "../../env";

const url = `${env.service_url}`;

const ListClassroom = () => {
  const [loading, setLoading] = useState(false);

  const [dataSearch, setDataSearch] = useState("สมหญิง");

  const [isSearch, setIsSearch] = useState(false);

  const [dataClassroomAll, setClassroomAll] = useState([]);

  const fetchClassroomAll = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/classrooms?q=${dataSearch}`);
      setClassroomAll(response.data);
    } catch (err) {
      console.log("fetchClassroomAll err :: ", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteClassroom = async (id) => {
    try {
      const confirmResult = await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการลบ",
          content: "คุณแน่ใจหรือไม่ว่าต้องการลบ Classroom นี้ ?",
          onOk: async () => {
            try {
              await axios.delete(`${url}/classrooms/${id}`);
              await fetchClassroomAll();
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
    fetchClassroomAll();
  }, []);

  const handleSearchChange = (event) => {
    setDataSearch(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Search
        style={{
          marginBottom: 20,
        }}
        placeholder="ค้นหา เลขที่ห้อง, ชื่อห้อง, ครูประจำชั้น"
        loading={isSearch && isSearch}
        onChange={handleSearchChange}
        enterButton
      />
      <br />
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
          dataLength={dataClassroomAll.length}
          next={fetchClassroomAll}
          hasMore={dataClassroomAll.length < 0}
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
            dataSource={dataClassroomAll}
            renderItem={(item) => (
              <List.Item key={item.fname}>
                <List.Item.Meta
                  title={
                    <a href="#">
                      เลขที่ห้อง : {item.room_number} {item.room_name}
                    </a>
                  }
                  description={`ครูประจำชั้น : ${item.teacher_name}, ป.${item.grade_level}, ปีการศึกษา ${item.academic_year}`}
                />
                <Link
                  to={`/view-classroom/${btoa(
                    item.classroom_id
                  )}?_=${uuidv4()}&ref=detail`}
                >
                  <Button type="primary" style={{ "margin-right": "5px" }}>
                    รายละเอียด
                  </Button>
                </Link>
                <Link
                  to={`/edit-classroom/${btoa(
                    item.classroom_id
                  )}?_=${uuidv4()}&ref=edit`}
                >
                  <Button style={{ "margin-right": "5px" }}>แก้ไข</Button>
                </Link>
                <Button
                  onClick={() => deleteClassroom(item.classroom_id)}
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
      </div>
    </>
  );
};
export default ListClassroom;
