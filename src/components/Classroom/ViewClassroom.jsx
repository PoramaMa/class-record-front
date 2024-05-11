import { Avatar, Button, Card, List, Modal, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";
import EditClassroom from "./EditClassroom";
import StudentInClass from "./StudentInClass";

const url = `${env.service_url}`;

const tabListNoTitle = [
  {
    key: "detail",
    label: "Detail",
  },
  {
    key: "student",
    label: "Student in Classroom",
  },
];
const contentListNoTitle = {
  detail: <EditClassroom />,
  student: <StudentInClass />,
};
const ViewClassroom = () => {
  const [activeTabKey2, setActiveTabKey2] = useState("detail");
  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [dataStudentAll, setStudentAll] = useState([]);

  const fetchStudentAll = async () => {
    try {
      const response = await axios.get(`${url}/students`);
      setStudentAll(response.data);
    } catch (err) {
      console.log("fetchStudentAll err :: ", err);
    }
  };

  useEffect(() => {
    fetchStudentAll();
  }, []);

  return (
    <>
      <Card
        style={{
          width: "100%",
        }}
        title={""}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={
          <Button type="primary" onClick={showModal}>
            Add Student
          </Button>
        }
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
      <Modal title="Student List" open={isModalOpen} onCancel={handleCancel}>
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
                    <a href="https://ant.design">
                      {item.title} {item.fname} {item.lname}
                    </a>
                  }
                  description={`เลขประจำตัว ${item.student_code}, ป.${item.grade_level}`}
                />
                <Button
                  onClick={() => deleteStudent(item.student_id)}
                  style={{ margin: "0 5px" }}
                  type="primary"
                >
                  Add
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </Modal>
    </>
  );
};
export default ViewClassroom;
