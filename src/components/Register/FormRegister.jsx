import { Avatar, Button, Form, Input, List, Select, Skeleton } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import img_user from "../../assets/images/user.png";
import { env } from "../../env";
const { Option } = Select;
const { Search } = Input;

const url = `${env.service_url}`;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

let query = "";
let academicYearQuery = "";
let gradeLevelQuery = "";
let classroomQuery = "";

const FormRegister = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [dataSearchClassroom, setDataSearchClassroom] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const [isSearchClassroom, setIsSearchClassroom] = useState(false);

  const [dataClassroomAll, setClassroomAll] = useState([]);

  const fetchClassroomAll = async () => {
    try {
      const response = await axios.get(`${url}/classrooms?q=${query}`);
      setClassroomAll(response.data);
    } catch (err) {
      console.log("fetchClassroomAll err :: ", err);
    } finally {
      setLoading(false);
      setIsSearch(false);
    }
  };

  const [dataSearchStudent, setDataSearchStudent] = useState("");

  const [isSearchStudent, setIsSearchStudent] = useState(false);

  const [dataStudentAll, setStudentAll] = useState([]);

  const fetchStudentAll = async () => {
    try {
      let year = academicYearQuery == 0 ? "" : academicYearQuery;
      let grade = gradeLevelQuery == 0 ? "" : gradeLevelQuery;
      let classroom = classroomQuery == 0 ? "" : classroomQuery;

      const response = await axios.get(
        `${url}/students/?q=${query}&class=${classroom}&year=${year}&grade=${grade}`
      );
      setStudentAll(response.data);
    } catch (err) {
      console.log("fetchStudentAll err :: ", err);
    } finally {
      setLoading(false);
      setIsSearch(false);
    }
  };

  useEffect(() => {
    query = "";
    academicYearQuery = "";
    gradeLevelQuery = "";
    classroomQuery = "";
    fetchClassroomAll();
    fetchStudentAll();
  }, []);

  const [form] = Form.useForm();

  const onStudent = async (values) => {
    try {
      await axios.post(`${url}/students`, values);
      navigate("/students?ref=all");
    } catch (err) {
      alert(err.message);
      console.log("onStudent err :: ", err);
    }
  };

  const handleSearchClassroomChange = (event) => {
    query = event.target.value;
    setDataSearchClassroom(event.target.value);
    setIsSearch(true);
    fetchClassroomAll();
  };

  const handleSearchChange = (event) => {
    query = event.target.value;
    setDataSearchStudent(event.target.value);
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
    <div>
      <Search
        style={{
          marginBottom: 20,
        }}
        placeholder="ค้นหา เลขที่ห้อง, ชื่อห้อง, ครูประจำชั้น"
        loading={isSearch && isSearch}
        onChange={handleSearchClassroomChange}
        onFocus={() => setIsSearchClassroom(true)}
        onBlur={() => setIsSearchClassroom(false)}
        enterButton
      />
      <div
        id="scrollableDiv"
        style={{
          display:
            dataSearchClassroom.length > 0 || isSearchClassroom
              ? "block"
              : "none",
          maxHeight: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
          marginBottom: 10,
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
                    <Link
                      to={`/view-classroom/${btoa(
                        item.classroom_id
                      )}?_=${uuidv4()}&ref=detail`}
                    >
                      เลขที่ห้อง : {item.room_number} {item.room_name}
                    </Link>
                  }
                  description={`ครูประจำชั้น : ${item.teacher_name}, ป.${item.grade_level}, ปีการศึกษา ${item.academic_year}`}
                />
                <Button
                  onClick={() => deleteClassroom(item.classroom_id)}
                  style={{ "margin-right": "5px" }}
                  type="primary"
                >
                  เลือก
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

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
          <Option value="0">ทั้งหมด</Option>
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
          <Option value="0">ทั้งหมด</Option>
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
          <Option value="0">ทั้งหมด</Option>
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
          onFocus={() => setIsSearchStudent(true)}
          onBlur={() => setIsSearchStudent(false)}
          enterButton
        />
      </div>

      <div
        id="scrollableDiv"
        style={{
          display:
            classroomQuery ||
            academicYearQuery ||
            gradeLevelQuery ||
            dataSearchStudent.length > 0 ||
            isSearchStudent
              ? "block"
              : "none",
          maxHeight: 400,
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
                    <Link
                      to={`/view-student/${btoa(
                        item.student_id
                      )}?_=${uuidv4()}&ref=detail`}
                    >
                      {item.title} {item.fname} {item.lname}
                    </Link>
                  }
                  description={`เลขประจำตัว ${item.student_code}, ป.${item.grade_level}`}
                />

                <Button
                  onClick={() => deleteStudent(item.student_id)}
                  style={{ margin: "0 5px" }}
                  type="primary"
                >
                  เลือก
                </Button>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>

      <Form
        {...formItemLayout}
        form={form}
        name="FormRegister"
        onFinish={onStudent}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{
          maxWidth: 950,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="classroom_id"
          label="ห้องเรียน"
          rules={[
            {
              required: true,
              message: "Please select classroom!",
            },
          ]}
        >
          <Select placeholder="select your classroom">
            <Option value="ด.ช.">ด.ช.</Option>
            <Option value="ด.ญ.">ด.ญ.</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="student_id"
          label="นักเรียน"
          rules={[
            {
              required: true,
              message: "Please select student!",
            },
          ]}
        >
          <Select placeholder="select your student">
            <Option value="ชาย">ชาย</Option>
            <Option value="หญิง">หญิง</Option>
            <Option value="อื่นๆ">อื่นๆ</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormRegister;
