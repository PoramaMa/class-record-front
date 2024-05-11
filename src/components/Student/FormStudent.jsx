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
        maxWidth: 950,
      }}
      scrollToFirstError
    >
      <Form.Item
        name="student_code"
        label="Student Code"
        tooltip="123456"
        rules={[
          {
            required: true,
            message: "Please input your student code!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: "Please select title!",
          },
        ]}
      >
        <Select placeholder="select your title">
          <Option value="ด.ช.">ด.ช.</Option>
          <Option value="ด.ญ.">ด.ญ.</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fname"
        label="First Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lname"
        label="Last Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="ชาย">ชาย</Option>
          <Option value="หญิง">หญิง</Option>
          <Option value="อื่นๆ">อื่นๆ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="grade_level"
        label="Grade Level"
        rules={[
          {
            required: true,
            message: "Please select Grade Level!",
          },
        ]}
      >
        <Select placeholder="select your Grade Level">
          <Option value="ป.1">ป.1</Option>
          <Option value="ป.2">ป.2</Option>
          <Option value="ป.3">ป.3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="birthdate"
        label="Birth Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormStudent;
