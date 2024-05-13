import {
  Avatar,
  Button,
  Card,
  Input,
  List,
  Modal,
  Select,
  Skeleton,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";
import EditClassroom from "./EditClassroom";
import StudentInClass from "./StudentInClass";
const { Search } = Input;
const { Option } = Select;

const url = `${env.service_url}`;

const tabListNoTitle = [
  {
    key: "student",
    label: "รายชื่อนักเรียนในห้อง",
  },
  {
    key: "detail",
    label: "รายละเอียด",
  },
];
const contentListNoTitle = {
  detail: <EditClassroom />,
  student: <StudentInClass />,
};

let query = "";
let academicYearQuery = "";
let gradeLevelQuery = "";
let classroomQuery = "";

const ViewClassroom = () => {
  const { id } = useParams();

  const [activeTabKey2, setActiveTabKey2] = useState("student");
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

  const [dataSearch, setDataSearch] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const [dataStudentAll, setStudentAll] = useState([]);

  const fetchStudentAll = async () => {
    try {
      const response = await axios.get(
        `${url}/students/?q=${query}&class=${classroomQuery}&year=${academicYearQuery}&grade=${gradeLevelQuery}`
      );
      setStudentAll(response.data);
    } catch (err) {
      console.log("fetchStudentAll err :: ", err);
    } finally {
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

  const addClassMap = async (student_id) => {
    try {
      await new Promise((resolve) => {
        Modal.confirm({
          title: "ยืนยันการบันทึก",
          content: "คุณแน่ใจหรือไม่ว่าต้องการเพิ่มนักเรียนเข้า Classroom นี้ ?",
          onOk: async () => {
            try {
              await axios.post(`${url}/class-maps`, {
                student_id: student_id,
                classroom_id: atob(id),
              });
              window.location.reload();
            } catch (err) {
              alert(err.response.data.message);
              console.log("addClassMap.post err :: ", err);
            }
            resolve(true);
          },
          onCancel: () => resolve(false),
        });
      });
    } catch (err) {
      console.log("addClassMap err :: ", err);
    }
  };

  useEffect(() => {
    query = "";
    academicYearQuery = "";
    gradeLevelQuery = "";
    classroomQuery = "";
    fetchStudentAll();
    fetchClassroomAll();
  }, []);

  const handleSearchChange = (event) => {
    query = event.target.value;
    setDataSearch(event.target.value);
    setIsSearch(true);
    fetchStudentAll();
  };

  const handleYearChange = (value) => {
    academicYearQuery = value;
    setIsSearch(true);
    fetchStudentAll();
  };

  const handleGradeChange = (value) => {
    gradeLevelQuery = value;
    setIsSearch(true);
    fetchStudentAll();
  };

  const handleClassroomChange = (value) => {
    classroomQuery = value;
    setIsSearch(true);
    fetchStudentAll();
  };

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
            เพิ่มนักเรียนเข้าห้อง
          </Button>
        }
        onTabChange={onTab2Change}
        tabProps={{
          size: "middle",
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
      <Modal
        title="รายชื่อนักเรียนทั้งหมด"
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Select
            onChange={handleYearChange}
            placeholder="ปีการศึกษา"
            style={{
              marginRight: 10,
            }}
          >
            <Option value="">ทั้งหมด</Option>
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
            onChange={handleGradeChange}
            placeholder="ระดับชั้น"
            style={{
              marginRight: 10,
            }}
          >
            <Option value="">ทั้งหมด</Option>
            <Option value="1">ป.1</Option>
            <Option value="2">ป.2</Option>
            <Option value="3">ป.3</Option>
          </Select>
          <Select
            onChange={handleClassroomChange}
            placeholder="ห้องเรียน"
            style={{
              marginRight: 10,
            }}
          >
            <Option value="">ทั้งหมด</Option>
            {dataClassroomAll.map((classroom) => (
              <Option
                key={classroom.classroom_id}
                value={classroom.classroom_id}
              >
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
                  onClick={() => addClassMap(item.student_id)}
                  style={{ margin: "0 5px" }}
                  type="primary"
                >
                  เพิ่ม
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
