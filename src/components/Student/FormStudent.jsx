import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
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
const FormStudent = () => {
  const navigate = useNavigate();

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

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onStudent}
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
              width: "500px",
            }}
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
              width: "500px",
            }}
            placeholder="select your title"
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
              width: "500px",
            }}
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
              width: "500px",
            }}
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
              width: "500px",
            }}
            placeholder="select your gender"
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
          <DatePicker />
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
              width: "500px",
            }}
            placeholder="select your Grade Level"
          >
            <Option value="1">ป.1</Option>
            <Option value="2">ป.2</Option>
            <Option value="3">ป.3</Option>
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
export default FormStudent;
