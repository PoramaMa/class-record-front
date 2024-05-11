import { Button, Divider, List, Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { env } from "../../env";

const url = `${env.service_url}`;

const StudentInClass = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [dataClassroomAll, setClassroomAll] = useState([]);

  const fetchClassMapByRoomId = async (id) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/class-maps/room/${atob(id)}`);
      setClassroomAll(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("fetchClassMapByRoomId err :: ", err);
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
    fetchClassMapByRoomId(id);
  }, []);

  return (
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
        next={fetchClassMapByRoomId}
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
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={dataClassroomAll}
          renderItem={(item) => (
            <List.Item key={item.fname}>
              <List.Item.Meta
                title={
                  <a href="https://ant.design">
                    {item.room_number} {item.room_name}
                  </a>
                }
                description={`ครูประจำชั้น : ${item.teacher_name}, ปีการศึกษา ${item.academic_year}`}
              />

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
  );
};
export default StudentInClass;
