import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { env } from "../../env";
const { Option } = Select;

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
const ViewStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form] = Form.useForm();

  const [dataStudentById, setStudentById] = useState([]);

  const fetchStudentById = async (id) => {
    try {
      const response = await axios.get(`${url}/students/${atob(id)}`);
      setStudentById(response.data);
      const {
        student_code,
        title,
        fname,
        lname,
        gender,
        grade_level,
        birthdate,
      } = response.data;
      form.setFieldsValue({
        student_code,
        title,
        fname,
        lname,
        gender,
        grade_level,
        birthdate: moment(birthdate),
      });
    } catch (err) {
      console.log("fetchStudentById err :: ", err);
    }
  };

  const onEditStudent = async (values) => {
    try {
      const result = await axios.patch(`${url}/students/${atob(id)}`, values);
      navigate("/students?ref=all");
    } catch (err) {
      alert(err.message);
      console.log("onEditStudent err :: ", err);
    }
  };

  const [isEdit, setIsEdit] = useState(false);

  const onEdit = async () => {
    setIsEdit(true);
  };

  useEffect(() => {
    fetchStudentById(id);
  }, []);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onEditStudent}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{
        width: "100%",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="student_code"
        label="เลขประจำตัวนักเรียน"
        tooltip="123456"
        rules={[
          {
            required: true,
            message: "Please input your student code!",
            whitespace: true,
          },
        ]}
      >
        <Input
          style={{
            width: "550px",
          }}
          disabled={!isEdit}
        />
      </Form.Item>

      <Form.Item
        name="title"
        label="คำนำหน้า"
        rules={[
          {
            required: true,
            message: "Please select title!",
          },
        ]}
      >
        <Select
          style={{
            width: "550px",
          }}
          placeholder="select your title"
          disabled={!isEdit}
        >
          <Option value="ด.ช.">ด.ช.</Option>
          <Option value="ด.ญ.">ด.ญ.</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fname"
        label="ชื่อจริง"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
      >
        <Input
          style={{
            width: "550px",
          }}
          disabled={!isEdit}
        />
      </Form.Item>

      <Form.Item
        name="lname"
        label="นามสกุล"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
            whitespace: true,
          },
        ]}
      >
        <Input
          style={{
            width: "550px",
          }}
          disabled={!isEdit}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="เพศ"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select
          style={{
            width: "550px",
          }}
          placeholder="select your gender"
          disabled={!isEdit}
        >
          <Option value="ชาย">ชาย</Option>
          <Option value="หญิง">หญิง</Option>
          <Option value="อื่นๆ">อื่นๆ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="birthdate"
        label="วันเกิด"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker disabled={!isEdit} />
      </Form.Item>

      <Form.Item
        name="grade_level"
        label="ระดับชั้น"
        rules={[
          {
            required: true,
            message: "Please select Grade Level!",
          },
        ]}
      >
        <Select
          style={{
            width: "550px",
          }}
          placeholder="select your Grade Level"
          disabled={!isEdit}
        >
          <Option value="1">ป.1</Option>
          <Option value="2">ป.2</Option>
          <Option value="3">ป.3</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        {isEdit ? (
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        ) : (
          <a onClick={onEdit}>Edit</a>
        )}
      </Form.Item>
    </Form>
  );
};
export default ViewStudent;
