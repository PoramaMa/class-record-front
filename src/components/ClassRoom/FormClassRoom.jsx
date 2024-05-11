import { Button, Form, Input, Select } from "antd";
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
const FormClassroom = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onClassroom = async (values) => {
    try {
      await axios.post(`${url}/classrooms`, values);
      navigate("/classrooms?ref=all");
    } catch (err) {
      alert(err.message);
      console.log("onClassroom err :: ", err);
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onClassroom}
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
        name="room_number"
        label="Room Number"
        tooltip="123456"
        rules={[
          {
            required: true,
            message: "Please input your Room Number!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="room_name"
        label="Room Name"
        rules={[
          {
            required: true,
            message: "Please input your Room Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
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
          <Option value="1">ป.1</Option>
          <Option value="2">ป.2</Option>
          <Option value="3">ป.3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="academic_year"
        label="Academic Year"
        tooltip="พ.ศ."
        rules={[
          {
            required: true,
            message: "Please select Academic Year!",
          },
        ]}
      >
        <Select placeholder="select your Academic Year">
          {[...Array(21)].map((_, index) => {
            const year = 2550 + index;
            return (
              <Option key={year} value={year.toString()}>
                {year}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="teacher_name"
        label="Teacher Name"
        rules={[
          {
            required: true,
            message: "Please input your Teacher Name!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default FormClassroom;
