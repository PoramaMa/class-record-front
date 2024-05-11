import { Avatar, Button, Divider, List, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";

const url = `${env.service_url}`;

const ListStudent = () => {
  const [loading, setLoading] = useState(false);

  const [dataStudentAll, setStudentAll] = useState([]);

  const fetchStudentAll = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${url}/students`);
      setStudentAll(response.data);
    } catch (err) {
      console.log("fetchStudentAll err :: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAll();
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
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={dataStudentAll}
          renderItem={(item) => (
            <List.Item key={item.fname}>
              <List.Item.Meta
                avatar={<Avatar src={img_user} />}
                title={
                  <a href="https://ant.design">
                    {item.title} {item.fname} {item.lname}
                  </a>
                }
                description={`เลขประจำตัว ${item.student_code}, ป.${item.grade_level}`}
              />
              <Link to={`/view-student/${btoa(item.student_id)}?_=${uuidv4()}`}>
                <Button type="primary">รายละเอียด</Button>
              </Link>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default ListStudent;
